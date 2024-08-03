import {NextFunction,Request,Response} from "express"
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware=(err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||'Internal Server Error';
    // wrong mongodb error
    if(err.name==='CastError'){
        const message='Resource not found '
        err=new ErrorHandler(message,400)
    }
    // wrong mongodb errorz
    if(err.code===11000){
        const message=`Duplicated ${Object.keys(err.keyvalue)} entered`
        err=new ErrorHandler(message,400)
    }
    // jwt error
    if(err.name==='TokenExpiredError'){
        const message='Your token has expired, please log in again'
        err=new ErrorHandler(message,400)
    }
    // jwt error
    if(err.name==='JsonWebTokenError'){
        const message='Your token is invalid, please log in again'
        err=new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}