require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesServices } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notfication.model";
import axios from 'axios';
// upload course
export const uploadCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const thumbnail = data.thumbnail;

            // Log the thumbnail value

            if (thumbnail) {
                let myCloud;
                if (typeof thumbnail === 'string') {
                    // If thumbnail is a direct URL or path string
                    myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                        folder: "courses",
                    });
                } else if (thumbnail.path && typeof thumbnail.path === 'string') {
                    // If thumbnail is an object with a path property
                    myCloud = await cloudinary.v2.uploader.upload(thumbnail.path, {
                        folder: "courses",
                    });
                } else {
                    return next(new ErrorHandler("Invalid thumbnail format. Expected a string or object with a path.", 400));
                }

                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }

            createCourse(req, res, next);
        } catch (error: any) {
            console.error("Upload course error:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Edit course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const courseId = req.params.id;

    // Ensure course data is retrieved
    const courseData = await CourseModel.findById(courseId) as any;
    if (!courseData) {
        return next(new ErrorHandler('Course not found', 404));
    }

    try {
        const thumbnail = data.thumbnail; // Thumbnail from the request body

        if (thumbnail) {
            if (typeof thumbnail === 'object' && thumbnail.url) {
                // Check if the existing thumbnail should be deleted
                if (courseData.thumbnail && courseData.thumbnail.public_id) {
                    // Delete the old thumbnail from Cloudinary
                    await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
                }

                // Upload the new thumbnail to Cloudinary
                const myCloud = await cloudinary.v2.uploader.upload(thumbnail.url, { 
                    folder: "courses"
                });

                // Update thumbnail data in the request body
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            } else if (typeof thumbnail === 'string' && thumbnail.startsWith("https")) {
                // Keep the existing thumbnail if it's a URL
                data.thumbnail = {
                    public_id: courseData.thumbnail.public_id,
                    url: courseData.thumbnail.url,
                };
            } else {
                return next(new ErrorHandler("Invalid thumbnail format. Expected a string or an object with a URL.", 400));
            }
        }

        // Find and update the course
        const course = await CourseModel.findByIdAndUpdate(
            courseId,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!course) {
            return next(new ErrorHandler('Course update failed', 500));
        }

        res.status(200).json({
            status: "success",
            data: course
        });

    } catch (error: any) {
        console.error("Error during course editing:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});



// get single course
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const isCatchExist = await redis.get(courseId)
        if (isCatchExist) {
            const course = JSON.parse(isCatchExist)
            res.status(200).json({
                success: true,
                course
            });
        } else {
            // Find the course by ID and exclude certain fields
            const course = await CourseModel.findById(courseId)
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

            if (!course) {
                return next(new ErrorHandler("Course not found", 404));
            }
            await redis.set(courseId, JSON.stringify(course), "EX", 604800)
            res.status(200).json({
                success: true,
                course
            });
        }

    } catch (error: any) {
        console.error("Error fetching course:", error);
        return next(new ErrorHandler("An error occurred while fetching the course", 500));
    }
});

// get all course
export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        
            // If no cached data, fetch from database
            const courses = await CourseModel.find()
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

            // Store the result in Redis cache
            res.status(200).json({
                success: true,
                data: courses,
            });
        
    } catch (error: any) {
        console.error("Error fetching courses:", error);
        return next(new ErrorHandler("An error occurred while fetching courses", 500));
    }
});

// get course content for only valid user
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const courseExist = userCourseList?.find((course: any) => course._id.toString() === courseId)

        if (!courseExist) {
            next(new ErrorHandler("you are not eligible to access this course", 404))
        }

        const course = await CourseModel.findById(courseId)
        const content = course?.courseData

        res.status(200).json({
            success: true,
            data: content,
        });
    } catch (error: any) {
        return next(new ErrorHandler("An error occurred while fetching courses", 500));
    }
})

// add question in the course
interface IQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IQuestionData = req.body
        const course = await CourseModel.findById(courseId)
        console.log(course)
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("invalid content id", 400))
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))
        console.log(courseContent)
        if (!courseContent) {
            return next(new ErrorHandler("content not found", 404))
        }

        //create new question object
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        // add this question in our course content
        courseContent?.questions.push(newQuestion)

        await NotificationModel.create({
            user: req.user?._id,
            title: "New Order",
            message: `You have a new question for this ${courseContent.title}`,
        });

        // save the upload course
        await course?.save()
        res.status(201).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// add answer 
interface IAddAnswer {
    answer: string;
    courseId: string
    contentId: string;
    questionId: string
}

export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswer = req.body;

        const course = await CourseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("invalid content id", 400))
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))
        if (!courseContent) {
            return next(new ErrorHandler("invalid content id", 400))
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId))
        if (!question) {
            return next(new ErrorHandler("invalid question id", 400))
        }

        const newAnswer: any = {
            user: req.user,
            answer,
        }

        // add this answer to our course content 
        question.questionReplies.push(newAnswer);


        await course?.save()

        if (req.user?._id === question.user._id) {
            // create notification
            await NotificationModel.create({
                user: req.user?._id,
                title: "New Reply Question Received",
                message: `You have a reply for this ${courseContent.title}`,
            });
        } else {
            const data: any = {
                name: question,
                title: courseContent.title
            }

            try {
                await sendMail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                })
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 500))
            }
        }

        res.status(201).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// Add review 
interface IReviewData {
    review: string
    rating: number
    userId: string
}

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses
        const courseId = req.params.id

        // check course already exist
        const courseExist = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());
        if (!courseExist) {
            return next(new ErrorHandler("You are bot eligible to access", 404))
        }

        const course = await CourseModel.findById(courseId)
        const { review, rating }: IReviewData = req.body

        const reviewData: any = {
            user: req.user,
            comment: review,
            rating
        }

        course?.reviews.push(reviewData)

        let avg = 0

        course?.reviews.forEach((review: any) => {
            avg += review.rating
        })

        if (course) {
            course.ratings = avg / course.reviews.length
        }

        await NotificationModel.create({
            user: req.user?._id,
            title: "New Review Added",
            message: `${req.user?.name} has added a new review for your course ${course?.name}`,
        });

        course?.save()

        res.status(201).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// add reply to review
interface IAddReviewData {
    comment: string,
    courseId: string,
    reviewId: string
}
export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, courseId, reviewId }: IAddReviewData = req.body
        const course = await CourseModel.findById(courseId)

        if (!course) {
            return next(new ErrorHandler("course not found", 404))
        }

        const review = course?.reviews.find((review: any) => review._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler("review not found", 404));
        }
        const replyData: any = {
            user: req.user,
            comment,
        }
        if (!review.commentReplies) {
            review.commentReplies = []
        }
        review.commentReplies?.push(replyData)

        await course.save()

        res.status(201).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// get all courses for only Admin
export const getAllCoursesForAdmin = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Call the service function
        await getAllCoursesServices(req, res, next); // Pass the request, response, and next as arguments
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
// Define an interface for the course thumbnail
interface Thumbnail {
    public_id: string;
    url: string;
}
interface Course {
    thumbnail?: Thumbnail; // Make it optional since not all courses may have a thumbnail
    deleteOne: (query: object) => Promise<void>; // Define deleteOne as a method
}
// Delete course for only admin
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findById(id);
        
        if (!course) {
            return next(new ErrorHandler("Course not found", 404)); // Changed message to 'Course not found'
        }

        // Delete the thumbnail from Cloudinary
        if (course.thumbnail && course.thumbnail.public_id) {
            await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
        }

        // Delete the course from the database
        await course.deleteOne({ _id: id }); // Ensure you are using the correct property to delete

        // Optionally remove the course from Redis cache
        await redis.del(id);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully" // Changed message to 'Course deleted successfully'
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


// Generate video URL
// Generate video URL
export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.body;

        if (!videoId) {
            return res.status(400).json({ message: "Video ID is missing." });
        }

        console.log('Video ID:', videoId);

        // Hardcoded API secret for debugging purpose
        const apiSecret = 'RG4TvN38GgRJ2jILYI6RLEbK37SuSZZBuOnvx5uKYbD3CVEvuJMHQE2HPpP5f6Zj';

        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Apisecret ${apiSecret}`, // Hardcoded for now
                },
            }
        );

        res.json(response.data);
    } catch (error: any) {
        console.error('Error from VdoCipher:', error.response?.data || error.message);
        return next(new ErrorHandler(error.message, 400));
    }
});
