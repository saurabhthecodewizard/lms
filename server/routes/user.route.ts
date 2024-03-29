import express from 'express';
import { activateUser, deleteUser, externalAuth, fetchAllUsers, getUserInfo, login, logout, register, updateAccessToken, updateAvatar, updatePassword, updateUserInfo, updateUserRole } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/activate', activateUser);

userRouter.post('/login', login);

userRouter.get('/logout', isAuthenticated, logout);

userRouter.get('/refresh', updateAccessToken);

userRouter.get('/profile', isAuthenticated, getUserInfo);

userRouter.post('/external', externalAuth);

userRouter.put('/profile', isAuthenticated, updateUserInfo);

userRouter.put('/password', isAuthenticated, updatePassword);

userRouter.put('/avatar', isAuthenticated, updateAvatar);

userRouter.get('/users/all', isAuthenticated, authorizeRoles('admin'), fetchAllUsers);

userRouter.put('/users/:id/role', isAuthenticated, authorizeRoles('admin'), updateUserRole);

userRouter.delete('/users/:id', isAuthenticated, authorizeRoles('admin'), deleteUser);

export default userRouter;