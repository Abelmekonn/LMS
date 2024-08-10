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
import { newOrder } from "../services/order.service";

// create order
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const {courseId,payment_info}=req.body as IOrder

        const user =await userModel.findById(req.user?._id);
        if(!user) { 
            return next(new ErrorHandler("User not found",404))
        }
        const courseExistInUser = user?.courses.some((course:any)=> course._id.toString() === courseId)
        if(!courseExistInUser) {
            return next(new ErrorHandler("Course not found",404))
        }
        const course = await CourseModel.findById(courseId);
        if(!course) {
            return next(new ErrorHandler("Course not found",404))
        }
        
        const data:any ={
            userId:user._id,
            courseId:course._id,
        }
        
        newOrder(data,res,next);
        const mailData : any= {
            order:{
                _id:course?._id.slice(0,6),
                name:course?.name,
                price:course?.price,
                date: new Date().toLocaleDateString('en-us',{year:"numeric",month:"long",day:"numeric"})
            }
        }
        const html=await ejs.renderFile(path.join(__dirname,"../mails/order-conformation.ejs"),mailData)
        try {
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Order Confirmation",
                    template:"order-conformation.ejs",
                    data:mailData
                })
            }
        } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
            
        }
        user?.courses.push(course._id)

        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
        
    }
})