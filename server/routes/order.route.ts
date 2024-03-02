import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, fetchAllOrders } from '../controllers/order.controller';

const orderRouter = express.Router();

orderRouter.post('/order', isAuthenticated, createOrder);

orderRouter.get('/orders/all', isAuthenticated, authorizeRoles('admin'), fetchAllOrders);

export default orderRouter;