import CreateCourseData from "./createCourseData.interface";

interface CreateCourse {
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: string;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: {
        title: string;
    }[];
    prerequisites: {
        title: string;
    }[];
    courseData: CreateCourseData[];
}

export default CreateCourse;
