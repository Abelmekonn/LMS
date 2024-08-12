import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import userModel from "../models/user.model";
import { generateLastMonthData } from "../utils/analyticsGenrator";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";


//get user analytics --only for admin
export const getUserAnalytics = CatchAsyncError( async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const users = await generateLastMonthData(userModel)
        res.status(200).json({
            success:true,
            users
        })
    } catch (error : any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//get course analytics --only for admin
export const getCourseAnalytics = CatchAsyncError( async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const courses = await generateLastMonthData(CourseModel)
        res.status(200).json({
            success:true,
            courses
        })
    } catch (error : any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//get course analytics --only for admin
export const getOrderAnalytics = CatchAsyncError( async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const orders = await generateLastMonthData(OrderModel)
        res.status(200).json({
            success:true,
            orders
        })
    } catch (error : any) {
        return next(new ErrorHandler(error.message,500))
    }
})