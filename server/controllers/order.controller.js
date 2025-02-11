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
exports.newPayment = exports.sendStripePublishableKey = exports.getOrders = exports.createOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const order_model_1 = __importDefault(require("../models/order.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notfication_model_1 = __importDefault(require("../models/notfication.model"));
const order_service_1 = require("../services/order.service");
const redis_1 = require("../utils/redis");
require("dotenv").config();
// Initialize Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Create Order
exports.createOrder = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, payment_info, userId } = req.body;
    // Verify payment information
    const paymentIntent = yield stripe.paymentIntents.retrieve(payment_info.id);
    if (paymentIntent.status !== "succeeded") {
        return next(new ErrorHandler_1.default("Payment not successful", 400));
    }
    // Fetch user
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        return next(new ErrorHandler_1.default("User not found", 404));
    }
    // Fetch course
    const course = yield course_model_1.default.findById(courseId);
    if (!course) {
        return next(new ErrorHandler_1.default("Course not found", 404));
    }
    // Check if user already owns the course
    const courseExistInUser = user.courses.some((userCourse) => userCourse.courseId.toString() === courseId);
    if (courseExistInUser) {
        return next(new ErrorHandler_1.default("You have already purchased this course", 400));
    }
    // Prepare data for order creation
    const data = {
        userId: user._id,
        courseId,
        payment_info,
    };
    // console.log("data", data);
    // Update user's courses and save
    user.courses.push({ courseId: courseId });
    yield redis_1.redis.set(userId, JSON.stringify(user));
    yield user.save();
    // Increment course purchase count atomically
    const updatedCourse = yield course_model_1.default.findByIdAndUpdate(courseId, { $inc: { purchased: 1 } }, { new: true });
    yield redis_1.redis.set(courseId, JSON.stringify(updatedCourse));
    if (!updatedCourse) {
        return next(new ErrorHandler_1.default("Failed to update course purchase count", 500));
    }
    // Create notification
    yield notfication_model_1.default.create({
        user: userId,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
    });
    // Create and save the order
    const order = yield order_model_1.default.create(data);
    const mailData = {
        order: {
            _id: courseId,
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        }
    };
    try {
        yield (0, sendMail_1.default)({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-conformation.ejs", // Pass the template name
            data: mailData,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
    // Return the order details
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
    });
}));
// Get All Orders
exports.getOrders = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_service_1.getAllOrdersService)(res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Send Stripe Publishable Key
exports.sendStripePublishableKey = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
        return next(new ErrorHandler_1.default("Stripe publishable key is not set", 500));
    }
    res.status(200).json({ publishableKey });
}));
// Create Payment Intent
exports.newPayment = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure the amount is provided in the request and is valid
        const amountInCents = Math.round(req.body.amount * 100); // Convert dollars to cents (e.g., $0.50 → 50 cents)
        if (amountInCents < 0.5) {
            return next(new ErrorHandler_1.default("Amount must be at least $0.50", 400));
        }
        const myPayment = yield stripe.paymentIntents.create({
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
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
