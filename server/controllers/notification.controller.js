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
exports.updateNotification = exports.getNotification = void 0;
const notfication_model_1 = __importDefault(require("../models/notfication.model"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const node_cron_1 = __importDefault(require("node-cron"));
// get notification -only for admin
exports.getNotification = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
            return next(new ErrorHandler_1.default("You are not authorized to access this resource", 403));
        }
        const notification = yield notfication_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            notification
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// update notification for only admin
exports.updateNotification = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notfication_model_1.default.findById(req.params.id);
        if (!notification) {
            return next(new ErrorHandler_1.default("Notification not found", 404));
        }
        else {
            notification.status ?
                (notification.status = "read")
                : notification === null || notification === void 0 ? void 0 : notification.status;
        }
        yield notification.save();
        const notifications = yield notfication_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            notifications
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// delete notification
node_cron_1.default.schedule("0 0 0 * * * ", () => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyDay = new Date(Date.now() - 30 * 24 * 60 * 1000);
    yield notfication_model_1.default.deleteMany({ status: "read", createdAt: { $lt: thirtyDay } });
    console.log("delete notification");
}));
