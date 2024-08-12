import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"
import LayoutModel from "../models/layout.mode";

// create lay out
export const createLayout = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type} = req.body
        if(type === 'Banner'){
            const {image,title,subTitle} = req.body
            const myCloud = await cloudinary.v2.uploader.upload('image',{
                folder: 'layout'
            })
            const banner = {
                image : {
                    public_id : myCloud.public_id,
                    url : myCloud.secure_url
                },
                title,
                subTitle
            }
            await LayoutModel.create(banner)
        }
        if(type === 'FAQ'){
            const {faq} = req.body
            await LayoutModel.create(faq)
        }
        if(type === "Categories"){
            const {categories} = req.body
            await LayoutModel.create(categories)
        }
        res.status(200).json({
            success:true,
            message:"successfully created "
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})