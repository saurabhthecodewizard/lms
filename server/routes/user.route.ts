import express from 'express';
import { activateUser, login, logout, register } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/activate', activateUser);

userRouter.post('/login', login);

userRouter.get('/logout', logout);

export default userRouter;