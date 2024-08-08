import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";

// upload course
export const uploadCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const thumbnail = data.thumbnail;

            // Log the thumbnail value
            console.log("Thumbnail received:", thumbnail);

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

// edit course
export const editCourse = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const data=req.body;
    const thumbnail=data.thumbnail;
    if(thumbnail){
        await cloudinary.v2.uploader.destroy(thumbnail.public_id)
        const myCloud=cloudinary.v2.uploader.upload(thumbnail,{
            folder:"courses"
        })
        data.thumbnail={
            public_id:(await myCloud).public_id,
            url:(await myCloud).secure_url,
        }
        const courseId=req.params.id;
        const course = await CourseModel.findByIdAndUpdate(
            courseId,{
            $set:data},
            {new:true
        })

        res.status(200).json({
            status:"success",
            data:course
        })

    }
})

// get single course
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        // Find the course by ID and exclude certain fields
        const course = await CourseModel.findById(courseId)
            .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error: any) {
        console.error("Error fetching course:", error);
        return next(new ErrorHandler("An error occurred while fetching the course", 500));
    }
});

// get all course
export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all courses and exclude certain fields
        const courses = await CourseModel.find()
            .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error: any) {
        console.error("Error fetching courses:", error);
        return next(new ErrorHandler("An error occurred while fetching courses", 500));
    }
});

// 