import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import { getUserAnalytics } from "../services/user.service";
import { getOrderAnalytics } from "../services/order.service";
import { getCourseAnalytics } from "../services/course.service";

export const fetchUserAnalytics = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUserAnalytics();

        res.status(200).json({
            success: true,
            users
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const fetchOrderAnalytics = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await getOrderAnalytics();

        res.status(200).json({
            success: true,
            orders
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const fetchCourseAnalytics = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await getCourseAnalytics();

        res.status(200).json({
            success: true,
            courses
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});