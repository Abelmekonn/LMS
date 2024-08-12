import NotificationModel from "../models/notfication.model";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron"
// get notification -only for admin
export const getNotification = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.find().sort({ createdAt: -1 })
        res.status(200).json({
            status: "success",
            notification
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// update notification for only admin
export const updateNotification = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id)
        if (!notification) {
            return next(new ErrorHandler("Notification not found", 404))
        } else {
            notification.status ? 
            (notification.status = "read") 
            : notification?.status;
        }
        await notification.save()
        
        const notifications = await NotificationModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            status: "success",
            notifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// delete notification
cron.schedule("0 0 0 * * * ", async ()=>{
    const thirtyDay = new Date(Date.now() - 30 * 24 * 60 * 1000)
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:thirtyDay}})
    console.log("delete notification")
})