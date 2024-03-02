import CourseModel, { Course } from "../models/course.model";


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
    "-courseData.videoUrl -courseData.suggestions -courseData.comments -courseData.links"
);

export const getAllCourses = () => CourseModel.find().select(
    "-courseData.videoUrl -courseData.suggestions -courseData.comments -courseData.links"
);

export const getCourseById = (courseId: string) => CourseModel.findById(courseId);

export const saveCourse = (course: Course) => course.save();

export const getAllCoursesData = () => CourseModel.find().sort({  createdAt: -1 })