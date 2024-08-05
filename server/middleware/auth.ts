import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

// authenticated user
export const isAuthenticated = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("Cookies:", req.cookies); // Check if cookies are present
        const access_token = req.cookies["access_token"];
        console.log("Access Token:", access_token); // Log access token

        if (!access_token) {
            return next(new ErrorHandler("Please login to access this resource", 400));
        }

        try {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET as string) as JwtPayload;
            if (!decoded) {
                return next(new ErrorHandler("Access token is not valid", 400));
            }

            // Check if the access token is expired
            if (decoded.exp && decoded.exp <= Date.now() / 1000) {
                await updateAccessToken(req, res, next);
            } else {
                const user = await redis.get(decoded._id as string);
                if (!user) {
                    return next(new ErrorHandler("Please login to access this resource", 400));
                }

                req.user = JSON.parse(user);
                next();
            }
        } catch (error) {
            return next(new ErrorHandler("Invalid token", 400));
        }
    }
);



// validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user?.role} is not allowed to access this resource`,
                    403
                )
            );
        }
        next();
    };
};
