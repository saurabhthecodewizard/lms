require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import ejs from 'ejs';
import path from "path";
import sendMail from "../utils/sendMail";
import { Order } from "../models/order.model";
import UserModel from "../models/user.model";
import { getCourseById, saveCourse } from "../services/course.service";
import { createNewOrder, getAllOrders } from "../services/order.service";
import { saveUser } from "../services/user.service";
import { createNotification } from "../services/norification.service";

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as Order;

        const user = await UserModel.findById(req.user?._id);

        if (!user) {
            return next(new GlobalErrorHandler("Invalid login!", 400));
        }

        const hasUserAlreadyEnrolledCourse = user.courses.some((course: any) => course._id.toString() === courseId);

        if (hasUserAlreadyEnrolledCourse) {
            return next(new GlobalErrorHandler("You have already purchased this course!", 400));
        }

        const course = await getCourseById(courseId);

        if (!course) {
            return next(new GlobalErrorHandler("Course not found!", 400));
        }

        const data: any = {
            courseId: course._id,
            userId: user._id
        }

        await createNewOrder(data);

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

        res.status(201).json({
            success: true,
            order: course
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