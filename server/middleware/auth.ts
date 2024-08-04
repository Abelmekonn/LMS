import { Response,Request,NextFunction } from "express";
import {CatchAsyncError} from "../middleware/catchAsyncError"


export const isAuthenticated = CatchAsyncError 