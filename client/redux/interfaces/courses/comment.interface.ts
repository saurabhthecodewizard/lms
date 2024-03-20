import UserBasic from "../users/userBasic.interface";

interface Comment {
    _id: string;
    user: UserBasic;
    comment: string;
    replies?: Comment[];
}

export default Comment;