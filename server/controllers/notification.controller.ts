import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import { getAllNotifications } from "../services/norification.service";


export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await getAllNotifications();

        res.status(200).json({
            success: true,
            notifications
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});