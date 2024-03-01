import express from 'express';
import { activateUser, externalAuth, getUserInfo, login, logout, register, updateAccessToken, updateAvatar, updatePassword, updateUserInfo } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/activate', activateUser);

userRouter.post('/login', login);

userRouter.get('/logout', isAuthenticated, authorizeRoles("admin"), logout);

userRouter.get('/refresh', updateAccessToken);

userRouter.get('/profile', isAuthenticated, getUserInfo);

userRouter.post('/external', externalAuth);

userRouter.put('/profile', isAuthenticated, updateUserInfo);

userRouter.put('/password', isAuthenticated, updatePassword);

userRouter.put('/avatar', isAuthenticated, updateAvatar);

export default userRouter;