require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
    expires?: Date;
    maxAge?: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    const userId = user._id as string;
    redis.set(userId, JSON.stringify(user) as any);

    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10) * 1000;
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10) * 1000;


    const accessTokenOptions: ITokenOptions = {
        maxAge: accessTokenExpire,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === 'production',
    };

    const refreshTokenOptions: ITokenOptions = {
        maxAge: refreshTokenExpire,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === 'production',
    };
    res.cookie('refresh_token', refreshToken, refreshTokenOptions)
    res.cookie('access_token', accessToken, accessTokenOptions)
    res.status(statusCode)
        .json({
            success: true,
            user,
            refreshToken,
            accessToken,
        });
};

