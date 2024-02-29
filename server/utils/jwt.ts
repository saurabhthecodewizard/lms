require('dotenv').config();
import { Response } from 'express';
import { User } from '../models/user.model';
import TokenOptions from '../interfaces/tokenOptions.interface';
import { redis } from './redis';

export const sendToken = (user: User, statusCode: number, res: Response) => {
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();

    // save session to redis
    redis.set(user._id, JSON.stringify(user) as any);

    // fallback values for env
    const accessTokenExpiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

    // cookies
    const accessTokenOptions: TokenOptions = {
        expires: new Date(Date.now() + accessTokenExpiresIn * 1000),
        maxAge: accessTokenExpiresIn * 1000,
        httpOnly: true,
        sameSite: 'lax'
    };

    const refreshTokenOptions: TokenOptions = {
        expires: new Date(Date.now() + refreshTokenExpiresIn * 1000),
        maxAge: refreshTokenExpiresIn * 1000,
        httpOnly: true,
        sameSite: 'lax'
    };

    // make production secure
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}