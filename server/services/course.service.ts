import { Request, Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";


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

// get all course
export const getAllCoursesServices = CatchAsyncError(async (req: Request, res: Response, next:NextFunction)=>{
    const courses = await CourseModel.find().sort({ceratedAt:-1})
    
    res.status(200).json({
        success:true,
        courses
    })
})
