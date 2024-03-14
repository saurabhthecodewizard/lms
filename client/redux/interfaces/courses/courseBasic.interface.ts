import CloudinaryImage from "../cloudinaryImage.interface";

interface CourseBasic {
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
}

export default CourseBasic;