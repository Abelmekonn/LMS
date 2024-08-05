require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}

// Parse environment variables with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10) * 60 * 1000;
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10) * 60 * 1000;

// Options for cookies
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire),
    maxAge: accessTokenExpire,
    httpOnly: true,
    sameSite: "none",
    secure: true,
};

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire),
    maxAge: refreshTokenExpire,
    httpOnly: true,
    sameSite: "none",
    secure: true,
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Ensure _id is treated as a string
    const userId = user._id as string;

    // Upload session to Redis with an expiry
    redis.set(userId, JSON.stringify(user), 'EX', refreshTokenExpire / 1000);

    res.status(statusCode)
        .cookie('access_token', accessToken, accessTokenOptions)
        .cookie('refresh_token', refreshToken, refreshTokenOptions)
        .json({
            success: true,
            user,
            accessToken,
            refreshToken,
        });
};
