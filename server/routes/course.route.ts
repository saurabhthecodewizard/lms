import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { addComment, addReply, addReview, addReviewReply, deleteCourse, fetchAllCourses, getAllAvailableCourses, getCourseInfo, getEnrolledCourse, getEnrolledCourses, updateExistingCourse, uploadCourse } from '../controllers/course.controller';
import { createRazorpayOrder, getFreeCourse } from '../controllers/order.controller';

const courseRouter = express.Router();

courseRouter.post('/course', isAuthenticated, authorizeRoles('admin'), uploadCourse);

courseRouter.put('/course/:id', isAuthenticated, authorizeRoles('admin'), updateExistingCourse);

courseRouter.get('/course/:id', getCourseInfo);

courseRouter.get('/courses', getAllAvailableCourses);

courseRouter.get('/course/enrolled/all', isAuthenticated, getEnrolledCourses);

courseRouter.get('/course/:id/enrolled', isAuthenticated, getEnrolledCourse);

courseRouter.put('/course/:id/comment', isAuthenticated, addComment);

courseRouter.put('/course/:id/reply', isAuthenticated, addReply);

courseRouter.put('/course/:id/review', isAuthenticated, addReview);

courseRouter.put('/course/:id/review/:reviewId', isAuthenticated, authorizeRoles('admin'), addReviewReply);

courseRouter.get('/courses/all', isAuthenticated, authorizeRoles('admin'), fetchAllCourses);

courseRouter.delete('/courses/:id', isAuthenticated, authorizeRoles('admin'), deleteCourse);

courseRouter.post('/course/:id/order', isAuthenticated, createRazorpayOrder);

courseRouter.post('/course/:id/free', isAuthenticated, getFreeCourse);

export default courseRouter;