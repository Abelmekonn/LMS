import { NextFunction,Response,Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel,{IOrder} from "../models/order.model";
import CourseModel from "../models/course.model";
import userModel from "../models/user.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notfication.model";

// create order
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const {courseId,payment_info}=req.body as IOrder
        
    } catch (error:any) {
        
    }
})