require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import ejs from 'ejs';
import path from "path";
import Razorpay from 'razorpay';
import crypto from 'crypto';
import sendMail from "../utils/sendMail";
import { Order } from "../models/order.model";
import UserModel from "../models/user.model";
import { getCourseById, saveCourse } from "../services/course.service";
import { createNewOrder, getAllOrders, getOrderById, saveOrder } from "../services/order.service";
import { saveUser } from "../services/user.service";
import { createNotification } from "../services/norification.service";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const createRazorpayOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id as string;

        const user = await UserModel.findById(req.user?._id);

        if (!user) {
            return next(new GlobalErrorHandler("Invalid login!", 400));
        }

        const hasUserAlreadyEnrolledCourse = user.courses.some((course: any) => course._id.toString() === courseId);

        if (hasUserAlreadyEnrolledCourse) {
            return next(new GlobalErrorHandler("You have already purchased this course!", 500));
        }

        const course = await getCourseById(courseId);

        if (!course) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }

        const order = await razorpay.orders.create({
            amount: course.price * 100,
            currency: 'EUR',
            receipt: crypto.randomUUID()
        })

        if (!order) {
            return next(new GlobalErrorHandler("Something went wrong!", 500));
        }

        const newOrder: any = {
            courseId: course._id,
            userId: req.user?._id,
            orderId: order.id,
            status: 'pending',
        }

        await createNewOrder(newOrder);

        res.status(200).json({
            success: true,
            order
        })

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const validateOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const user = await UserModel.findById(req.user?._id);
        const order = await getOrderById(razorpay_order_id);

        if (!user) {
            return next(new GlobalErrorHandler("Invalid login!", 400));
        }

        if (!order) {
            return next(new GlobalErrorHandler("Something went wrong!", 500));
        }

        try {
            const generatedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');

            if (generatedSignature !== razorpay_signature) {
                return res.status(400).json({ msg: 'Illicit Transaction!' });
            }

            const course = await getCourseById(order.courseId);

            if (!course) {
                return next(new GlobalErrorHandler("Course not found!", 400));
            }

            const mailData: any = {
                order: {
                    _id: course._id.toString().slice(0, 6),
                    name: course.name,
                    price: course.price,
                    date: new Date().toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                },
                user: {
                    firstName: user.firstName
                }
            };

            const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), mailData);

            try {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData
                })
            } catch (error: any) {
                return next(new GlobalErrorHandler(error.message, 500));
            }

            user.courses.push(course._id);
            await saveUser(user);

            await createNotification({
                user: user._id,
                title: "New Order",
                message: `You have a new order from ${course.name}`
            });

            if (!course.purchased) {
                course.purchased = 0;
            }
            course.purchased += 1;

            await saveCourse(course);

            order.status = 'success';

            await saveOrder(order);
        } catch (error: any) {

            order.status = 'failed';

            await saveOrder(order);
            return next(new GlobalErrorHandler(error.message, 500));
        }

        res.status(200).json({
            success: true,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const fetchAllOrders = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await getAllOrders();

        res.status(200).json({
            success: true,
            orders
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});