require('dotenv').config();
import jwt from 'jsonwebtoken';
import mongoose, { Document, Model, Schema } from "mongoose";
import { hash as hashPassword, compare as comparePassword } from 'bcryptjs';


const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string
    },
    role: string;
    isAuthenticated: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    accessToken: () => string;
    refreshToken: () => string;
}

const userSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function (value: string) {
                return EMAIL_REGEX.test(value);
            },
            message: 'Please enter a valid email',
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user',
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: String,
        }
    ]
},
    { timestamps: true });

// Password hashing
userSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await hashPassword(this.password, 10);
    next();
});

// access token
userSchema.methods.accessToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.ACCESS_TOKEN as string);
};

// refresh token
userSchema.methods.refreshToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.REFRESH_TOKEN as string);
};

// compare password
userSchema.methods.comparePassword = async function (inputPassword: string) {
    return await comparePassword(inputPassword, this.password);
}

const userModel: Model<User> = mongoose.model("User", userSchema);

export default userModel;