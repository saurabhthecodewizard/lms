import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getNotifications, updateNotification } from '../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.get('/notifications', isAuthenticated, authorizeRoles("admin"), getNotifications);

notificationRouter.put('/notifications/:id', isAuthenticated, authorizeRoles("admin"), updateNotification);

export default notificationRouter;