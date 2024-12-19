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
import { Types } from "mongoose";
require("dotenv").config();

// Initialize Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export interface CustomRequest extends Request {
    user?: {
        _id: string; // Or ObjectId based on your database setup
    };
}

// Create Order
export const createOrder = CatchAsyncError(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    // Verify payment information
    if (payment_info?.id) {
        const paymentIntentId = payment_info.id;

        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status !== "succeeded") {
                return next(new ErrorHandler("Payment not successful", 400));
            }
        } catch (error: any) {
            return next(new ErrorHandler("Invalid payment intent ID", 400));
        }
    }

    // Fetch user
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Fetch course
    const course = await CourseModel.findById(courseId);
    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    // Check if user already owns the course
    const courseExistInUser = user.courses.some((userCourse) => userCourse.courseId === courseId);
    if (courseExistInUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
    }

    // Prepare data for order creation
    const data: IOrder = {
        userId: user._id,
        courseId,
        payment_info,
    };

    // Prepare mail data
    const mailData: any = {
        order: {
            _id: courseId.slice(0, 6),
            name: course.name,
            price: course.price.toFixed(2),
            date: new Date().toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }),
        },
    };

    // Send confirmation email
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

    // Update user's courses
    user.courses.push({ courseId: new Types.ObjectId(courseId) });
    const userId = req.user?._id?.toString();
    if (userId) {
        await redis.set(userId, JSON.stringify(user), "EX", 3600); // Cache for 1 hour
    }
    await user.save();

    // Create notification
    await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
    });

    // Increment course purchase count
    course.purchased = (course.purchased || 0) + 1;
    await course.save();

    // Create new order
    return newOrder(data, res, next);
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

        if (amountInCents < 50) {
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