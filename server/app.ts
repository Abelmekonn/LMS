import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import { ErrorMiddleware } from "./middleware/error";
import courseRouter from "./routes/course.route";
import bodyParser from "body-parser";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytic.route";
import layoutRoute from "./routes/layout.route";

dotenv.config();

export const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
// Middleware to parse JSON
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"], // Update with your client's URL
    credentials: true, // Allow credentials (cookies)
}));

// Test route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "test api",
        success: true
    });
});

// Routers
app.use("/api/v1", 
    userRouter,
    courseRouter,
    orderRouter,
    notificationRouter,
    analyticsRouter,
    layoutRoute);


// Handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Error middleware
app.use(ErrorMiddleware);
