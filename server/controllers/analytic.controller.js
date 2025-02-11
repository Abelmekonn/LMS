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
exports.getOrderAnalytics = exports.getCourseAnalytics = exports.getUserAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const user_model_1 = __importDefault(require("../models/user.model"));
const analyticsGenrator_1 = require("../utils/analyticsGenrator");
const course_model_1 = __importDefault(require("../models/course.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
//get user analytics --only for admin
exports.getUserAnalytics = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, analyticsGenrator_1.generateLastMonthData)(user_model_1.default);
        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
//get course analytics --only for admin
exports.getCourseAnalytics = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, analyticsGenrator_1.generateLastMonthData)(course_model_1.default);
        res.status(200).json({
            success: true,
            courses
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
//get course analytics --only for admin
exports.getOrderAnalytics = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, analyticsGenrator_1.generateLastMonthData)(order_model_1.default);
        res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
