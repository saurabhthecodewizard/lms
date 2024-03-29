import CloudinaryImage from "../cloudinaryImage.interface";
import CourseDataInfo from "./courseDataInfo.interface";
import Review from "./review.interface";

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
    reviews: Review[];
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