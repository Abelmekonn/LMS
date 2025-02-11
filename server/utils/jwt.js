"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
require("dotenv").config();
const redis_1 = require("./redis");
// Parse environment variables with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
// Options for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    sameSite: "lax",
    secure: false, // Ensure this is false in non-HTTPS environments
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "lax",
    secure: false, // Ensure this is false in non-HTTPS environments
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // Store user session in Redis
    redis_1.redis.set(user._id, JSON.stringify(user));
    // Set cookies
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        refreshToken,
    });
};
exports.sendToken = sendToken;
