import { NextFunction,Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

// create new order
export const newOrder = CatchAsyncError(async (data:any,res:Response, next:NextFunction)=>{
    const order = await OrderModel.create(data)
    res.status(201).json({
        success: true,
        order
    });
})

// get all orders
// Get all orders
export const getAllOrdersService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.find().sort({ created: -1 });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error: any) {
        next(new ErrorHandler(error.message, 500));
    }
};