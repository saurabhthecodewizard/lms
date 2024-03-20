import Comment from "./comment.interface";

interface EnrolledCourseData {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    suggestions: string;
    comments: Comment[];
}

export default EnrolledCourseData;