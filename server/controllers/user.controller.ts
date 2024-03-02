require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import UserModel, { User } from "../models/user.model";
import RegistrationBody from "../interfaces/registrationBody.interface";
import UserAuthenticationSecret from "../interfaces/userAuthenticationSecret.interface";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from "path";
import sendMail from "../utils/sendMail";
import UserRegisterAuthRequest from "../interfaces/userRegisterAuthRequest.interface";
import { sendToken, tokenOptions } from "../utils/jwt";
import LoginRequest from "../interfaces/loginRequest.interface";
import { redis } from "../utils/redis";
import { getAllUsers, getUserByEmail, getUserByEmailWithPass, getUserById, getUserByIdWithPass, saveUser } from "../services/user.service";
import ExternalAuth from "../interfaces/externalAuth.interface";
import UpdatePassword from "../interfaces/updatePassword.interface";
import UpdateAvatar from "../interfaces/updateAvatar.interface";
import cloudinary from 'cloudinary';

export const createUserAuthenticationSecret = (user: RegistrationBody): UserAuthenticationSecret => {
    const activationCode: string = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user, activationCode
    },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m"
        });
    return {
        token,
        activationCode
    };
}

export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const isEmailDuplicate = await getUserByEmail(email);
        if (isEmailDuplicate) {
            return next(new GlobalErrorHandler("Email already exists", 400));
        }

        const user: RegistrationBody = {
            firstName,
            lastName,
            email,
            password
        }

        const userAuthenticationSecret = createUserAuthenticationSecret(user);
        const activationCode = userAuthenticationSecret.activationCode;

        const data = {
            user: {
                firstName: user.firstName,
                lastName: user.lastName
            },
            activationCode
        };

        const html = ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        try {
            await sendMail({
                email: user.email,
                subject: 'Activate your account',
                template: 'activation-mail.ejs',
                data
            });

            res.status(201).json({
                success: true,
                message: `Activation code sent to ${user.email}. Please enter the activation code to activate your account!`,
                activationToken: userAuthenticationSecret.token
            })
        } catch (err: any) {
            return next(new GlobalErrorHandler(err.message, 400));
        }

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, code } = req.body as UserRegisterAuthRequest;

        const newUser: { user: User, activationCode: string } = jwt.verify(
            token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: User, activationCode: string };

        if (newUser.activationCode !== code) {
            return next(new GlobalErrorHandler("Invalid code!", 400))
        }

        const { firstName, lastName, email, password } = newUser.user;

        const isEmailDuplicate = await getUserByEmail(email);
        if (isEmailDuplicate) {
            return next(new GlobalErrorHandler("Email already exists", 400));
        }

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password
        })

        res.status(201).json({
            success: true
        })

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginRequest;

        if (!email || !password) {
            return next(new GlobalErrorHandler('Please enter email and password', 400));
        }

        const user = await getUserByEmailWithPass(email);

        if (!user) {
            return next(new GlobalErrorHandler('Invalid email or password', 400));
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new GlobalErrorHandler('Invalid email or password', 400));
        }

        sendToken(user, 200, res);

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const logout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });

        const userId = req.user?._id || '';
        redis.del(userId);

        res.status(200).json({
            success: true,
            message: 'Logout successfull'
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
        const message = 'Something went wrong! Refresh token invalid';
        if (!decoded) {
            return next(new GlobalErrorHandler(message, 400));
        }
        const session = await redis.get(decoded.id as string);
        if (!session) {
            return next(new GlobalErrorHandler(message, 400));
        }

        const user = JSON.parse(session);

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
            expiresIn: "5m"
        });

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
            expiresIn: "3d"
        });

        req.user = user;

        const { accessTokenOptions, refreshTokenOptions } = tokenOptions();

        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        res.status(200).json({
            success: true,
            accessToken
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return next(new GlobalErrorHandler("Invalid login", 400));
        }

        const userString = await redis.get(userId);
        const user = JSON.parse(userString || '');

        res.status(200).json({
            success: true,
            user
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const externalAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, avatar } = req.body as ExternalAuth;

        const user = await getUserByEmail(email);
        if (!user) {
            const newUser = await UserModel.create({
                firstName,
                lastName,
                email,
                avatar
            });
            sendToken(newUser, 200, res);
        } else {
            sendToken(user, 200, res);
        }
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName } = req.body as UpdateUserInfo;
        const userId = req.user?._id;
        const user = await getUserById(userId);

        if (email && user) {
            const isEmailExist = await getUserByEmail(email);
            if (isEmailExist) {
                return next(new GlobalErrorHandler("Email already exists!", 400));
            }
            user.email = email;
        }

        if (firstName && user) {
            user.firstName = firstName;
        }

        if (lastName && user) {
            user.lastName = lastName;
        }

        await saveUser(user);

        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as UpdatePassword;

        if (!oldPassword || !newPassword) {
            return next(new GlobalErrorHandler("Enter old and new password!", 400));
        }

        const userId = req.user?._id;
        const user = await getUserByIdWithPass(userId);

        if (!user?.password) {
            return next(new GlobalErrorHandler("Invalid user!", 400));
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return next(new GlobalErrorHandler("Invalid password!", 400));
        }

        user.password = newPassword;

        await saveUser(user);

        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body as UpdateAvatar;

        const userId = req.user?._id;
        const user = await getUserByIdWithPass(userId);

        if (!user || !avatar) {
            return next(new GlobalErrorHandler("Invalid user!", 400));
        }

        if (user?.avatar.public_id) {
            await cloudinary.v2.uploader.destroy(user?.avatar.public_id);
        }

        const avatarCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars"
        });

        user.avatar = {
            public_id: avatarCloud.public_id,
            url: avatarCloud.secure_url
        }

        await saveUser(user);

        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});

export const fetchAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            users
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 500));
    }
});