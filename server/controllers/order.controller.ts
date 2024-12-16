import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import CourseModel from "../models/course.model";
import UserModel from "../models/user.model";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notfication.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import { Request } from "express";
import { Types } from "mongoose";
require("dotenv").config();
const strip = require("stripe")(process.env.STRIPE_SECRET_KEY)

export interface CustomRequest extends Request {
    user?: {
        _id: string; // or string, depending on your database setup
    };
}

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    if (payment_info) {
        if ("id" in payment_info) {
            const paymentIntentId = payment_info.id
            const paymentIntent = await strip.paymentIntents.retrieve(
                paymentIntentId
            )

            if (paymentIntent.status !== "succeeded") {
                return next(new ErrorHandler("Payment already successful", 400))
            }
        }
    }

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

    const mailData: any = {
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
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }

    user.courses.push({ courseId });

    const userId = req.user?._id?.toString(); // Convert ObjectId to string
    if (userId) {
        await redis.set(userId, JSON.stringify(user), "EX", 3600);
    }


    await user.save();

    await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
    });

    if (course.purchased) {
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

export const sendStripePublishableKey = CatchAsyncError(async (req: Request, res: Response) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

export const newPayment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myPayment = await strip.paymentIntents.create({
            amount: req.body.amount,
            currency: "USD",
            metadata: {
                company: "E-Learning"
            },
            automatic_payment_method: {
                enabled: true
            }
        });
        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})