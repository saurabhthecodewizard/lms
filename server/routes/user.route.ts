import express from 'express';
import { activateUser, register } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/activate', activateUser);

export default userRouter;