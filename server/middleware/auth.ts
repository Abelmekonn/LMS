import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

// Authenticated user
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token as string;
    if (!accessToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string) as JwtPayload;
        // Check if the token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            // Refresh the access token
            await updateAccessToken(req, res, next);
            return; // Exit to avoid further processing
        }

        // Validate the user from Redis
        const user = await redis.get(decoded.id as string);

        if (!user) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        req.user = JSON.parse(user);
        next();
    } catch (error:any) {
        // If token expired error, handle it by refreshing the token
        if (error.name === "TokenExpiredError") {
            await updateAccessToken(req, res, next);
        } else {
            console.error('Error verifying token:', error);
            return next(new ErrorHandler("Invalid or expired access token", 401));
        }
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
