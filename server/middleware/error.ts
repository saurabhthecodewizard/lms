import { NextFunction, Request, Response } from "express";
import GlobalErrorHandler from "../utils/ErrorHandler";


const GlobalErrorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Invalid mongodb id
    if (err.name === 'CastError') {
        const message = `Resource not found: Invalid ${err.path}`;
        err = new GlobalErrorHandler(message, 400);
    }

    // Duplicate key
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)}`;
        err = new GlobalErrorHandler(message, 400);
    }

    // Invalid jwt
    if (err.name === 'JsonWebTokenError') {
        const message = `Invalid token, please try again...`;
        err = new GlobalErrorHandler(message, 400);
    }

    // Expired token
    if (err.name === 'TokenExpiredError') {
        const message = `Token expired, please try again...`;
        err = new GlobalErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default GlobalErrorMiddleware;