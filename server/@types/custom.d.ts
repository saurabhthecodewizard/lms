import { Request } from 'express';
import { User as UserDocument } from '../models/user.model';

declare global {
    namespace Express {
        interface User extends UserDocument {}
        interface Request {
            user?: UserDocument
        }
    }
};