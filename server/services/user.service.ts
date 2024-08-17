import { NextFunction, Response } from "express"
import userModel from "../models/user.model"
import { redis } from "../utils/redis"
import ErrorHandler from "../utils/ErrorHandler"

//get user by id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user
        });
    } else {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
};
// Get all users
export const getAllUsersService = async ( res: Response, next: NextFunction) => {
    try {
        const allUsers = await userModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            allUsers
        });
    } catch (error: any) {
        next(new ErrorHandler(error.message, 500));
    }
}

// update user role
export const updateUserRoleService = async (req: Request, res: Response, next: NextFunction)=>{
    const user = await userModel.findByIdAndUpdate(id,{role},{new:true})
    res.status(200).json({
        success: true,
        user
        })
}