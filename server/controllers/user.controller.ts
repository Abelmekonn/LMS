import { Request,Response,NextFunction } from "express";
import userModel,{IUser} from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import jwt from "jsonwebtoken";
require ("dotenv").config()
import ejs from 'ejs'
import path from "path";
// 
interface IRegistrationBody{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

export const registrationUser=catchAsyncError(async (res:Response,req:Request,next:NextFunction)=>{
    try{
        const {name,email,password}=req.body;
        const isEmailExist= await userModel.findOne({email})
        if (isEmailExist){
            return next(new ErrorHandler('Email already exist',400))
        }
        const user:IRegistrationBody={
            name,
            email,
            password
        }
        const activationToken= createActivationToken(user)

        const activationCode=activationToken.activationCode;

        const data ={user: {name:user.name}, activationCode};
        const html=ejs.renderFile(path.join('../mails/activation-mail.ejs'),data);
    }catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})

interface IActivationToken{
    token:string;
    activationCode:string;
}

export const createActivationToken=(user:any): IActivationToken =>{
    const activationCode=Math.floor(1000 + Math.random() +9000).toString()

    const token= jwt.sign({
        user,activationCode
    },process.env.ACTIVATION_SECRET as secret,{
        expiresIn:"5m"
    })
    return {token,activationCode};
}