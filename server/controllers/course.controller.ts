import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCourse, updateCourse } from "../services/course.service";


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