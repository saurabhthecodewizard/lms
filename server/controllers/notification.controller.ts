import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import { getAllNotifications, getNotificationById, saveNotification } from "../services/norification.service";


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

export const updateNotification = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.id as string;

        const notification = await getNotificationById(notificationId);

        if (!notification) {
            return next(new GlobalErrorHandler("Invalid Notification", 400));
        }

        notification.status = "read";

        await saveNotification(notification);

        const notifications = await getAllNotifications();

        res.status(200).json({
            success: true,
            notifications
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});