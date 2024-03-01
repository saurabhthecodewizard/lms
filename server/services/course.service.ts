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

export const getCourseDetails = (courseId: string) => CourseModel.findById(courseId).select(
    "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
);

export const getAllCourses = () => CourseModel.find().select(
    "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
);