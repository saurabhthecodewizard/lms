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
import analyticsRouter from './routes/analytics.route';
import passport from 'passport';
import authRouter from './routes/auth.route';
import { configureSocialAuthStrategy } from './utils/socialAuthStrategies';
import { rateLimit } from 'express-rate-limit'

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie porser
app.use(cookieParser());

// cross origin resource sharing
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// routes
app.use(
    '/api/v1',
    userRouter,
    courseRouter,
    orderRouter,
    notificationRouter,
    analyticsRouter
);

// routes
app.use(
    '',
    authRouter
);

// initialize passport
app.use(passport.initialize());

configureSocialAuthStrategy();

//testing api
app.get('/test', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'LMS Test API'
    });
});

// unkmown route
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    const err = new Error(`${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);;
});

app.use(GlobalErrorMiddleware);