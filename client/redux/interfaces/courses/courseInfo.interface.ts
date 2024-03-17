import CloudinaryImage from "../cloudinaryImage.interface";
import CourseDataInfo from "./courseDataInfo.interface";

interface CourseInfo {
    _id: string;
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail?: CloudinaryImage;
    tags: string;
    level: string;
    rating?: number;
    reviews: [];
    demoUrl: string;
    benefits: {
        title: string;
    }[];
    prerequisites: {
        title: string;
    }[];
    courseData: CourseDataInfo[];
}

export default CourseInfo;