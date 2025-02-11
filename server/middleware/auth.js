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
exports.authorizeRoles = exports.isAuthenticated = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const user_controller_1 = require("../controllers/user.controller");
// Authenticated user
exports.isAuthenticated = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next(new ErrorHandler_1.default("Please login to access this resource", 401));
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN);
        // Check if the token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            // Refresh the access token
            yield (0, user_controller_1.updateAccessToken)(req, res, next);
            return; // Exit to avoid further processing
        }
        // Validate the user from Redis
        const user = yield redis_1.redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("Please login to access this resource", 401));
        }
        req.user = JSON.parse(user);
        next();
    }
    catch (error) {
        // If token expired error, handle it by refreshing the token
        if (error.name === "TokenExpiredError") {
            yield (0, user_controller_1.updateAccessToken)(req, res, next);
        }
        else {
            console.error('Error verifying token:', error);
            return next(new ErrorHandler_1.default("Invalid or expired access token", 401));
        }
    }
}));
// Validate user role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "")) {
            return next(new ErrorHandler_1.default(`Role: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
