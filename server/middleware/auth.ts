import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "./catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from "../utils/redis";

// is user authenticated
export const isAuthenticated = CatchAsyncError(async (req: Request, _res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
        return next(new GlobalErrorHandler("Please login to access the resource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if (!decoded) {
        return next(new GlobalErrorHandler("Invalid access token", 400));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
        return next(new GlobalErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);

    next();
});

// validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new GlobalErrorHandler(`Unauthorized User: ${req.user?._id}`, 403));
        }
        next();
    }
}