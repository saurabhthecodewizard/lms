import CloudinaryImage from "../cloudinaryImage.interface";

interface UserBasic {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: CloudinaryImage;
    role: string;
}

export default UserBasic;