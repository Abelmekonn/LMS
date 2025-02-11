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
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateAvatar = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
require("dotenv").config();
const user_model_1 = __importDefault(require("../models/user.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const user_service_1 = require("../services/user.service");
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.registrationUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming Request Body:", req.body);
    const { name, email, password } = req.body;
    const isEmailExist = yield user_model_1.default.findOne({ email });
    if (isEmailExist) {
        return next(new ErrorHandler_1.default("Email already exists", 400));
    }
    const user = { name, email, password };
    const activationToken = (0, exports.createActivationToken)(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };
    try {
        yield (0, sendMail_1.default)({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs", // Pass the template name
            data,
        });
        res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to activate your account!`,
            activationToken: activationToken.token,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { activation_token, activation_code } = req.body;
    if (!activation_token) {
        return next(new ErrorHandler_1.default("Activation token is missing", 400));
    }
    const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler_1.default("Invalid activation code", 400));
    }
    const { name, email, password } = newUser.user;
    const existUser = yield user_model_1.default.findOne({ email });
    if (existUser) {
        return next(new ErrorHandler_1.default("Email already exists", 400));
    }
    yield user_model_1.default.create({ name, email, password });
    res.status(201).json({
        success: true,
    });
}));
exports.loginUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler_1.default("Please enter email and password", 400));
    }
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user || !(yield user.comparePassword(password))) {
        return next(new ErrorHandler_1.default("Invalid email or password", 400));
    }
    // Remove the password field before sending the token or response
    user.password = "";
    (0, jwt_1.sendToken)(user, 200, res);
}));
exports.logoutUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Clear cookies
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        // Get user ID from request
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not found", 400));
        }
        // Delete user session from Redis
        yield redis_1.redis.del(userId);
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateAccessToken = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return next(new ErrorHandler_1.default("Refresh token is missing", 401));
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN);
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Invalid refresh token", 401));
    }
    const session = yield redis_1.redis.get(decoded.id);
    if (!session) {
        return next(new ErrorHandler_1.default("Session expired. Please login again.", 401));
    }
    const user = JSON.parse(session);
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: 15 * 60 * 1000 });
    const newRefreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: 7 * 24 * 60 * 60 * 1000 });
    req.user = user;
    // Set new tokens
    res.cookie("access_token", accessToken, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 }); // Example: 1 hour
    res.cookie("refresh_token", newRefreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 604800000 }); // Example: 7 days
    yield redis_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 days
    next();
}));
// get user
exports.getUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        yield (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// social auth
exports.socialAuth = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, avatar } = req.body;
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updatePassword = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler_1.default("Please provide both old and new password", 400));
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId).select("+password");
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("invalid user", 400));
        }
        const isPasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword));
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("invalid password", 400));
        }
        user.password = newPassword;
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateAvatar = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { avatar } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (avatar && user) {
            if ((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id) {
                yield cloudinary_1.default.v2.uploader.destroy((_c = user === null || user === void 0 ? void 0 : user.avatar) === null || _c === void 0 ? void 0 : _c.public_id);
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                };
            }
            else {
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                };
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get all users for admin
exports.getAllUsers = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_1.getAllUsersService)(res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserRole = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.body; // Destructure role and id from req.body
        // Call updateUserRoleService and pass the necessary arguments
        yield (0, user_service_1.updateUserRoleService)(id, role, res, next); // Pass id, role, res, and next
    }
    catch (error) {
        next(error); // Handle errors by passing to the next middleware
    }
}));
// delete user for only admin 
exports.deleteUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("user not found", 404));
        }
        yield user.deleteOne({ id });
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
