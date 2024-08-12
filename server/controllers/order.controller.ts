import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import CourseModel from "../models/course.model";
import UserModel from "../models/user.model";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notfication.model";
import { getAllOrders, getAllOrdersService, newOrder } from "../services/order.service";

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    const user = await UserModel.findById(req.user?._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    const courseExistInUser = user.courses.some((userCourse) => userCourse.courseId === courseId);
    if (courseExistInUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
    }

    const data: any = {
        userId: user._id,
        courseId,
        payment_info,  // Ensure payment_info is correctly populated before this step
    };

    const mailData : any = {
        order: {
            _id: courseId.slice(0, 6),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })
        }
    };

    try {
        await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-conformation.ejs",
            data: mailData,
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }

    user.courses.push({ courseId });
    await user.save();

    await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
    });

    if(course.purchased){
        course.purchased += 1;
    }

    await course.save()

    return newOrder(data, res, next);
});

// Get all orders
export const getOrders = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllOrdersService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});