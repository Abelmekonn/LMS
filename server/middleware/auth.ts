import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

// Authenticated user
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    console.log('Access Token from Cookie:', access_token);

    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }
    try {
        const decoded = jwt.decode(access_token) as JwtPayload;
        
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            
            updateAccessToken(req, res, next);
        } else {
            const user = await redis.get(decoded.id);

            if (!user) {
                return next(new ErrorHandler("Please login to access this resource", 400));
            }

            req.user = JSON.parse(user);
            next();
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return next(new ErrorHandler("Invalid or expired access token", 401));
    }
});

// Validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
