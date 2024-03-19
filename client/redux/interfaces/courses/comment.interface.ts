import UserBasic from "../users/userBasic.interface";

interface Comment {
    user: UserBasic;
    comment: string;
    replies?: Comment[];
}

export default Comment;