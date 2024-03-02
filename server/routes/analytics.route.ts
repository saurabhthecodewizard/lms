import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { fetchCourseAnalytics, fetchOrderAnalytics, fetchUserAnalytics } from '../controllers/analytics.controller';

const analyticsRouter = express.Router();

analyticsRouter.get('/analytics/users', isAuthenticated, authorizeRoles("admin"), fetchUserAnalytics);

analyticsRouter.get('/analytics/courses', isAuthenticated, authorizeRoles("admin"), fetchCourseAnalytics);

analyticsRouter.get('/analytics/orders', isAuthenticated, authorizeRoles("admin"), fetchOrderAnalytics);

export default analyticsRouter;