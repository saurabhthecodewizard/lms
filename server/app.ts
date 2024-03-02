require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import GlobalErrorMiddleware from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';

// body parser
app.use(express.json({limit: "50mb"}));

// cookie porser
app.use(cookieParser());

// cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));

// routes
app.use(
    '/api/v1', 
    userRouter,
    courseRouter,
    orderRouter,
    notificationRouter
);

//testing api
app.get('/test', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'LMS Test API'
    });
});

// unkmown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);;
});

app.use(GlobalErrorMiddleware);