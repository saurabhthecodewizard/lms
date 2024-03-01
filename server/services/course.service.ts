import CourseModel from "../models/course.model";


export const createCourse = (data: any) => CourseModel.create(data);

export const updateCourse = (courseId: string, data: any) => CourseModel.findByIdAndUpdate(
    courseId,
    {
        $set: data
    },
    {
        new: true
    }
);