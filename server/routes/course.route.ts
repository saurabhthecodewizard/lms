import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getAllAvailableCourses, getCourseInfo, getEnrolledCourse, updateExistingCourse, uploadCourse } from '../controllers/course.controller';

const courseRouter = express.Router();

courseRouter.post('/course', isAuthenticated, authorizeRoles('admin'), uploadCourse);

courseRouter.put('/course/:id', isAuthenticated, authorizeRoles('admin'), updateExistingCourse);

courseRouter.get('/course/:id', getCourseInfo);

courseRouter.get('/courses', getAllAvailableCourses);

courseRouter.get('/course/:id/enrolled', isAuthenticated, getEnrolledCourse);

export default courseRouter;