import { Request, Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";


// Create course
export const createCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    // Create course
    const course = await CourseModel.create(data);
    res.status(201).json({ 
        success: true,
        course 
    });
});
