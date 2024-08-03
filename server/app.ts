import express, { NextFunction, Request, Response } from "express";
export const app=express();
import cors from "cors";
import cookieParser from "cookie-parser"
import { ErrorMiddleware } from "./middleware/error";
require("dotenv").config();
import userRouter from "./routes/user.route";

// body parser 
app.use(express.json(({limit:"50mb"})));

// cookies parser
app.use(cookieParser());

// cors 
app.use(cors({
    origin: process.env.ORIGIN
}));

//api 
app.get("/test",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
        message:"test api",
        successes:true
    })
})

// router
app.use("/api/v1",userRouter);
// unknown
app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err=new Error(`route ${req.originalUrl} not found`) as any;
    err.statusCode=404
    next(err)
})


app.use(ErrorMiddleware);