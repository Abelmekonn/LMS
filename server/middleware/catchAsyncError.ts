import { NextFunction, Request, Response } from "express"

export const catchAsyncError = 
    (theFun: any) => (res: Response, req: Request, next: NextFunction) => {
    Promise.resolve(theFun(res, req, next)).catch(next);
};
