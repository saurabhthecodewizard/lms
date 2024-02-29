require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import GlobalErrorHandler from "../utils/ErrorHandler";
import userModel, { User } from "../models/user.model";
import RegistrationBody from "../interfaces/registrationBody.interface";
import UserAuthenticationSecret from "../interfaces/userAuthenticationSecret.interface";
import jwt, { Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from "path";
import sendMail from "../utils/sendMail";
import UserRegisterAuthRequest from "../interfaces/userRegisterAuthRequest.interface";
import { sendToken } from "../utils/jwt";
import LoginRequest from "../interfaces/loginRequest.interface";

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

        const isEmailDuplicate = await userModel.findOne({ email });
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
        return next(new GlobalErrorHandler(err.message, 400));
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

        const isEmailDuplicate = await userModel.findOne({ email });
        if (isEmailDuplicate) {
            return next(new GlobalErrorHandler("Email already exists", 400));
        }

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password
        })

        res.status(201).json({
            success: true
        })

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginRequest;

        if(!email || !password) {
            return next(new GlobalErrorHandler('Please enter email and password', 400));
        }

        const user = await userModel.findOne({email}).select("+password");

        if(!user) {
            return next(new GlobalErrorHandler('Invalid email or password', 400));
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return next(new GlobalErrorHandler('Invalid email or password', 400));
        }

        sendToken(user, 200, res);

    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});

export const logout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: 'Logout successfull'
        })
    } catch (err: any) {
        return next(new GlobalErrorHandler(err.message, 400));
    }
});