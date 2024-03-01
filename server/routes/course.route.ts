import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateExistingCourse, uploadCourse } from '../controllers/course.controller';

const courseRouter = express.Router();

courseRouter.post('/course', isAuthenticated, authorizeRoles('admin'), uploadCourse);

courseRouter.put('/course/:id', isAuthenticated, authorizeRoles('admin'), updateExistingCourse);

export default courseRouter;