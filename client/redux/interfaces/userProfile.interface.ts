interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName?: string;
    role: string;
    courses?: { _id: string; }[];
    avatar?: {
        public_id: string;
        url: string;
    }
}

export default UserProfile;