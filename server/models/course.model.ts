import mongoose, { Document, Model, Schema } from "mongoose";

export interface Comment extends Document {
    user: object;
    comment: string;
    replies?: Comment[];
}

export interface Review extends Document {
    user: object;
    rating: number;
    comment: string;
    replies: Comment[];
}

export interface Link extends Document {
    title: string;
    url: string;
}

interface CourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: Link[];
    suggestions: string;
    questions: Comment[];
}

interface Course extends Document {
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: {
        title: string;
    }[];
    prerequisites: {
        title: string;
    }[];
    reviews: Review[];
    courseData: CourseData[];
    rating?: number;
    purchased?: number;
}

const reviewSchema = new Schema<Review>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
});

const linkSchema = new Schema<Link>({
    title: String,
    url: String
});

const commentSchema = new Schema<Comment>({
    user: Object,
    comment: String,
    replies: [Object]
});

const courseDataSchema = new Schema<CourseData>({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoThumbnail: Object,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestions: String,
    questions: [commentSchema]
});

const courseSchema = new Schema<Course>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    rating: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
});

const CourseModel: Model<Course> = mongoose.model("COurse", courseSchema);

export default CourseModel;