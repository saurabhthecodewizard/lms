import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCourse, getAllCourses, getCourseById, getCourseDetails, saveCourse, updateCourse } from "../services/course.service";
import { redis } from "../utils/redis";
import AddComment from "../interfaces/addComment.interface";
import mongoose from "mongoose";


export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const thumbnail = data.thumbnail;
        if (!!thumbnail) {
            const thumbnailCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: thumbnailCloud.public_id,
                url: thumbnailCloud.secure_url
            }
        }

        const course = await createCourse(data);
        res.status(201).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const updateExistingCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const thumbnail = data.thumbnail;
        if (!!thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const thumbnailCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: thumbnailCloud.public_id,
                url: thumbnailCloud.secure_url
            }
        }

        const courseId = req.params.id;

        const course = await updateCourse(courseId, data);

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const getCourseInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const cachedCourse = await redis.get(courseId);

        if (cachedCourse) {
            const course = JSON.parse(cachedCourse);
            res.status(200).json({
                success: true,
                course
            });
        } else {
            const course = await getCourseDetails(courseId);

            redis.set(courseId, JSON.stringify(course));

            res.status(200).json({
                success: true,
                course
            });
        }
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const getAllAvailableCourses = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const allCachedCourses = await redis.get('allCourses');
        if (allCachedCourses) {
            const courses = JSON.parse(allCachedCourses);
            res.status(200).json({
                success: true,
                courses
            });
        } else {
            const courses = await getAllCourses();

            await redis.set('allCourses', JSON.stringify(courses));

            res.status(200).json({
                success: true,
                courses
            });
        }
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const getEnrolledCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allEnrolledCourses = req.user?.courses;
        const requestedCourseId = req.params.id;

        const isCourseExists = allEnrolledCourses?.some((course: any) => course._id.toString() === requestedCourseId);
        if (!isCourseExists) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }

        const course = await getCourseById(requestedCourseId);
        const courseContent = course?.courseData;

        res.status(200).json({
            success: true,
            content: courseContent
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const addComment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, contentId } = req.body as AddComment;
        const courseId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new GlobalErrorHandler("Invalid content!", 404));
        }

        const course = await getCourseById(courseId);

        if (!course) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }

        const courseContent = course?.courseData.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new GlobalErrorHandler("Invalid content!", 404));
        }

        const newComment: any = {
            user: req.user,
            comment,
            replies: [],
        }

        courseContent.comments.push(newComment);

        await saveCourse(course);

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});