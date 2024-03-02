import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { addComment, addReply, addReview, addReviewReply, getAllAvailableCourses, getCourseInfo, getEnrolledCourse, updateExistingCourse, uploadCourse } from '../controllers/course.controller';

const courseRouter = express.Router();

courseRouter.post('/course', isAuthenticated, authorizeRoles('admin'), uploadCourse);

courseRouter.put('/course/:id', isAuthenticated, authorizeRoles('admin'), updateExistingCourse);

courseRouter.get('/course/:id', getCourseInfo);

courseRouter.get('/courses', getAllAvailableCourses);

courseRouter.get('/course/:id/enrolled', isAuthenticated, getEnrolledCourse);

courseRouter.put('/course/:id/comment', isAuthenticated, addComment);

courseRouter.put('/course/:id/reply', isAuthenticated, addReply);

courseRouter.put('/course/:id/review', isAuthenticated, addReview);

courseRouter.put('/course/:id/review/:reviewId', isAuthenticated, authorizeRoles('admin'), addReviewReply);

export default courseRouter;