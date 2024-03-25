require('dotenv').config();
import { Response } from 'express';
import { User } from '../models/user.model';
import TokenOptions from '../interfaces/tokenOptions.interface';
import { redis } from './redis';

export const tokenOptions = () => {
    // fallback values for env
    const accessTokenExpiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

    // cookies
    const accessTokenOptions: TokenOptions = {
        expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 60 * 1000),
        maxAge: accessTokenExpiresIn * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    };

    const refreshTokenOptions: TokenOptions = {
        expires: new Date(Date.now() + refreshTokenExpiresIn * 24 * 60 * 60 * 1000),
        maxAge: refreshTokenExpiresIn * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    };

    return {
        accessTokenOptions, 
        refreshTokenOptions
    };
}

export const sendToken = (user: User, statusCode: number, res: Response) => {
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();

    // save session to redis
    redis.set(user._id, JSON.stringify(user) as any);

    const { accessTokenOptions, refreshTokenOptions } = tokenOptions();

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
};

export const attachTokenAndRedirect = (user: User, res: Response) => {
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();

    // save session to redis
    redis.set(user._id, JSON.stringify(user) as any);

    const { accessTokenOptions, refreshTokenOptions } = tokenOptions();

    // make production secure
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.redirect(process.env.ORIGIN || 'http://localhost:3000')
};