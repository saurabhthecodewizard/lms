import UserBasic from "../users/userBasic.interface";
import Comment from "./comment.interface";

interface Review {
    _id: string;
    user: UserBasic;
    rating: number;
    comment: string;
    replies?: Comment[];
}

export default Review;