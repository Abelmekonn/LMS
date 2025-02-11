"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAllCoursesForAdmin = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getAllCourse = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
require("dotenv").config();
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notfication_model_1 = __importDefault(require("../models/notfication.model"));
const axios_1 = __importDefault(require("axios"));
// upload course
exports.uploadCourse = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        // Log the thumbnail value
        if (thumbnail) {
            let myCloud;
            if (typeof thumbnail === 'string') {
                // If thumbnail is a direct URL or path string
                myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                    folder: "courses",
                });
            }
            else if (thumbnail.path && typeof thumbnail.path === 'string') {
                // If thumbnail is an object with a path property
                myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail.path, {
                    folder: "courses",
                });
            }
            else {
                return next(new ErrorHandler_1.default("Invalid thumbnail format. Expected a string or object with a path.", 400));
            }
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, course_service_1.createCourse)(req, res, next);
    }
    catch (error) {
        console.error("Upload course error:", error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// Edit course
exports.editCourse = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const courseId = req.params.id;
    // Ensure course data is retrieved
    const courseData = yield course_model_1.default.findById(courseId);
    if (!courseData) {
        return next(new ErrorHandler_1.default('Course not found', 404));
    }
    try {
        const thumbnail = data.thumbnail; // Thumbnail from the request body
        if (thumbnail) {
            if (typeof thumbnail === 'object' && thumbnail.url) {
                // Check if the existing thumbnail should be deleted
                if (courseData.thumbnail && courseData.thumbnail.public_id) {
                    // Delete the old thumbnail from Cloudinary
                    yield cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
                }
                // Upload the new thumbnail to Cloudinary
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail.url, {
                    folder: "courses"
                });
                // Update thumbnail data in the request body
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            else if (typeof thumbnail === 'string' && thumbnail.startsWith("https")) {
                // Keep the existing thumbnail if it's a URL
                data.thumbnail = {
                    public_id: courseData.thumbnail.public_id,
                    url: courseData.thumbnail.url,
                };
            }
            else {
                return next(new ErrorHandler_1.default("Invalid thumbnail format. Expected a string or an object with a URL.", 400));
            }
        }
        // Find and update the course
        const course = yield course_model_1.default.findByIdAndUpdate(courseId, { $set: data }, { new: true, runValidators: true });
        if (!course) {
            return next(new ErrorHandler_1.default('Course update failed', 500));
        }
        res.status(200).json({
            status: "success",
            data: course
        });
    }
    catch (error) {
        console.error("Error during course editing:", error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// get single course
exports.getSingleCourse = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        // Validate the course ID
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return next(new ErrorHandler_1.default("Invalid course ID format", 400));
        }
        // Check Redis cache
        const cachedCourse = yield redis_1.redis.get(courseId);
        if (cachedCourse) {
            const course = JSON.parse(cachedCourse);
            return res.status(200).json({
                success: true,
                course,
            });
        }
        // Find the course by ID and exclude certain fields
        const course = yield course_model_1.default.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        // Cache the course data in Redis for 7 days (604800 seconds)
        yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        console.error("Error fetching course:", error);
        return next(new ErrorHandler_1.default("An error occurred while fetching the course", 500));
    }
}));
// get all course
exports.getAllCourse = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If no cached data, fetch from database
        const courses = yield course_model_1.default.find()
            .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        // Store the result in Redis cache
        res.status(200).json({
            success: true,
            data: courses,
        });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return next(new ErrorHandler_1.default("An error occurred while fetching courses", 500));
    }
}));
// get course content for only valid user
exports.getCourseByUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((item) => item.courseId.toString() === courseId.toString());
        if (!courseExist) {
            console.log("object");
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = yield course_model_1.default.findById(courseId);
        const content = course === null || course === void 0 ? void 0 : course.courseData;
        res.status(200).json({
            success: true,
            data: content ? [content] : [], // Wrap content in an array
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("An error occurred while fetching courses", 500));
    }
}));
exports.addQuestion = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { question, courseId, contentId } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("invalid content id", 400));
        }
        const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("content not found", 404));
        }
        //create new question object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: []
        };
        // add this question in our course content
        courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions.push(newQuestion);
        yield notfication_model_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
            title: "New Question",
            message: `You have a new question for this ${courseContent.title}`,
        });
        // save the upload course
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addAnswer = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("invalid content id", 400));
        }
        const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("invalid content id", 400));
        }
        const question = (_b = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions) === null || _b === void 0 ? void 0 : _b.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("invalid question id", 400));
        }
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        // add this answer to our course content 
        question.questionReplies.push(newAnswer);
        yield (course === null || course === void 0 ? void 0 : course.save());
        if (((_c = req.user) === null || _c === void 0 ? void 0 : _c._id) === question.user._id) {
            // create notification
            yield notfication_model_1.default.create({
                user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
                title: "New Reply Question Received",
                message: `You have a reply for this ${courseContent.title}`,
            });
        }
        else {
            const data = {
                name: question,
                title: courseContent.title
            };
            try {
                yield (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 500));
            }
        }
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addReview = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        // check course already exist
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((course) => course.courseId.toString() === courseId.toString());
        if (!courseExist) {
            return next(new ErrorHandler_1.default("You are not eligible to access", 404));
        }
        const course = yield course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            comment: review,
            rating
        };
        course === null || course === void 0 ? void 0 : course.reviews.push(reviewData);
        let avg = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((review) => {
            avg += review.rating;
        });
        if (course) {
            course.ratings = avg / course.reviews.length;
        }
        yield notfication_model_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            title: "New Review Added",
            message: `${(_c = req.user) === null || _c === void 0 ? void 0 : _c.name} has added a new review for your course ${course === null || course === void 0 ? void 0 : course.name}`,
        });
        course === null || course === void 0 ? void 0 : course.save();
        yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addReplyToReview = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("course not found", 404));
        }
        const review = course === null || course === void 0 ? void 0 : course.reviews.find((review) => review._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("review not found", 404));
        }
        const replyData = {
            user: req.user,
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        (_a = review.commentReplies) === null || _a === void 0 ? void 0 : _a.push(replyData);
        yield course.save();
        yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        yield notfication_model_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            title: "New Reply Question Received",
            message: `You have a reply for this ${course === null || course === void 0 ? void 0 : course.name}`,
        });
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// get all courses for only Admin
exports.getAllCoursesForAdmin = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service function
        yield (0, course_service_1.getAllCoursesServices)(req, res, next); // Pass the request, response, and next as arguments
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Delete course for only admin
exports.deleteCourse = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_model_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404)); // Changed message to 'Course not found'
        }
        // Delete the thumbnail from Cloudinary
        if (course.thumbnail && course.thumbnail.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy(course.thumbnail.public_id);
        }
        // Delete the course from the database
        yield course.deleteOne({ _id: id }); // Ensure you are using the correct property to delete
        // Optionally remove the course from Redis cache
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully" // Changed message to 'Course deleted successfully'
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Generate video URL
// Generate video URL
exports.generateVideoUrl = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { videoId } = req.body;
        if (!videoId) {
            return res.status(400).json({ message: "Video ID is missing." });
        }
        console.log('Video ID:', videoId);
        // Hardcoded API secret for debugging purpose
        const apiSecret = 'RG4TvN38GgRJ2jILYI6RLEbK37SuSZZBuOnvx5uKYbD3CVEvuJMHQE2HPpP5f6Zj';
        const response = yield axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${apiSecret}`, // Hardcoded for now
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error from VdoCipher:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
