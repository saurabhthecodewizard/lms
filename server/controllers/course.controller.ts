import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import ejs from 'ejs';
import { createCourse, deleteCourseById, getAllCourses, getAllCoursesData, getCourseById, getCourseDetails, saveCourse, updateCourse } from "../services/course.service";
import { redis } from "../utils/redis";
import AddComment from "../interfaces/addComment.interface";
import mongoose from "mongoose";
import AddReply from "../interfaces/addReply.interface";
import path from "path";
import sendMail from "../utils/sendMail";
import AddReview from "../interfaces/addReview.interface";
import { Review } from "../models/course.model";
import { createNotification } from "../services/norification.service";


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
        return next(new GlobalErrorHandler(err.message, 500));
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
        return next(new GlobalErrorHandler(err.message, 500));
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
        return next(new GlobalErrorHandler(err.message, 500));
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
        return next(new GlobalErrorHandler(err.message, 500));
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
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const addComment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, contentId } = req.body as AddComment;
        const courseId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
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

        await createNotification({
            user: req.user?._id,
            title: "New Comment",
            message: `You have a new comment on ${course.name} in section ${courseContent.title}.`
        });

        await saveCourse(course);

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const addReply = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reply, contentId, commentId } = req.body as AddReply;
        const courseId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
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

        const comment = courseContent.comments.find((item: any) => item._id.equals(commentId));

        if (!comment) {
            return next(new GlobalErrorHandler("Comment not found!", 404));
        }

        const newReply: any = {
            user: req.user,
            reply
        };

        comment.replies?.push(newReply);

        await saveCourse(course);

        if (req.user?._id === comment.user._id) {
            await createNotification({
                user: req.user?._id,
                title: "New Reply",
                message: `You have a reply on ${course.name} in section ${courseContent.title}.`
            });
        } else {
            const data = {
                firstName: comment.user.firstName,
                title: courseContent.title
            }

            const html = await ejs.renderFile(
                path.join(__dirname, "../mails/notification-mail.ejs"),
                data
            );

            try {
                await sendMail({
                    email: comment.user.email,
                    subject: "Notification from Acadia",
                    template: "notification-mail.ejs",
                    data
                });
            } catch (error: any) {
                return next(new GlobalErrorHandler(error.message, 400));
            }
        }

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, rating } = req.body as AddReview;
        const allEnrolledCourses = req.user?.courses;
        const requestedCourseId = req.params.id;

        const isCourseExists = allEnrolledCourses?.some((course: any) => course._id.toString() === requestedCourseId);
        if (!isCourseExists) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }

        const course = await getCourseById(requestedCourseId);

        if (!course) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }
        const review: any = {
            user: req.user,
            comment,
            rating
        }

        course.reviews.push(review);

        let avg = 0;
        course?.reviews.forEach((review: Review) => avg += review.rating);
        course.rating = avg / course.reviews.length;

        await saveCourse(course);

        await createNotification({
            user: req.user?._id,
            title: "New Review",
            message: `${req.user?.firstName} has posted a review on your course - ${course.name}`
        });

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const addReviewReply = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment } = req.body as AddReviewReply;
        const requestedCourseId = req.params.id;
        const requestedReviewId = req.params.reviewId;

        const course = await getCourseById(requestedCourseId);

        if (!course) {
            return next(new GlobalErrorHandler("Course not found!", 404));
        }

        const review = course.reviews.find((review: Review) => review._id.equals(requestedReviewId));

        if (!review) {
            return next(new GlobalErrorHandler("Something went wrong!", 404));
        }

        const reviewReply: any = {
            user: req.user,
            comment
        }

        if (!review.replies) {
            review.replies = []
        }

        review.replies.push(reviewReply);

        await saveCourse(course);

        await createNotification({
            user: req.user?._id,
            title: "New Review Reply",
            message: `${req.user?.firstName} has posted a reply to your review on the course - ${course.name}`
        });

        res.status(200).json({
            success: true,
            course
        });
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const fetchAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await getAllCoursesData();

        res.status(200).json({
            success: true,
            courses
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const course = await getCourseById(courseId);

        if(!course) {
            return next(new GlobalErrorHandler("Course not found!", 400))
        }

        await deleteCourseById(course);

        await redis.del(courseId);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully!"
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});