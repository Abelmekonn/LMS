import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import CourseModel from "../models/course.model";
import UserModel, { IUser } from "../models/user.model";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notfication.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import { Types } from "mongoose";
require("dotenv").config();

// Initialize Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export interface IOrder {
    userId: Types.ObjectId;
    courseId: string;
    payment_info?: {
        id: string;
    };
}
// Create Order
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info, userId } = req.body;
    // Verify payment information

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_info.id);
    if (paymentIntent.status !== "succeeded") {
        return next(new ErrorHandler("Payment not successful", 400));
    }

    // Fetch user
    const user = await UserModel.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Fetch course
    const course = await CourseModel.findById(courseId);
    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    // Check if user already owns the course
    const courseExistInUser = user.courses.some((userCourse) =>
        userCourse.courseId.toString() === courseId
    );

    if (courseExistInUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
    }
    // Prepare data for order creation
    const data = {
        userId: user._id,
        courseId,
        payment_info,
    } as IOrder;

    // console.log("data", data);

    // Update user's courses and save
    user.courses.push({ courseId: courseId });
    await redis.set(userId, JSON.stringify(user));
    await user.save();

    // Increment course purchase count atomically
    const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { $inc: { purchased: 1 } },
        { new: true }
    );
    await redis.set(courseId, JSON.stringify(updatedCourse));

    if (!updatedCourse) {
        return next(new ErrorHandler("Failed to update course purchase count", 500));
    }

    // Create notification
    await NotificationModel.create({
        user: userId,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
    });

    // Create and save the order
    const order = await OrderModel.create(data);

    const mailData = {
        order:{
            _id:courseId,
            name:course.name,
            price:course.price,
            date:new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        }
    }

    try {
        await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-conformation.ejs", // Pass the template name
            data:mailData,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }

    // Return the order details
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
    });
});


// Get All Orders
export const getOrders = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllOrdersService(req, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Send Stripe Publishable Key
export const sendStripePublishableKey = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
        return next(new ErrorHandler("Stripe publishable key is not set", 500));
    }

    res.status(200).json({ publishableKey });
});

// Create Payment Intent
export const newPayment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ensure the amount is provided in the request and is valid
        const amountInCents = Math.round(req.body.amount * 100); // Convert dollars to cents (e.g., $0.50 → 50 cents)

        if (amountInCents < 0.5) {
            return next(new ErrorHandler("Amount must be at least $0.50", 400));
        }

        const myPayment = await stripe.paymentIntents.create({
            amount: amountInCents, // Stripe expects amount in cents
            currency: "USD",
            metadata: {
                company: "E-Learning",
            },
        });

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});