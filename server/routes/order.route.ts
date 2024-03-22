import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { fetchAllOrders, validateOrder } from '../controllers/order.controller';

const orderRouter = express.Router();

orderRouter.post('/order/validate', isAuthenticated, validateOrder);

orderRouter.get('/orders/all', isAuthenticated, authorizeRoles('admin'), fetchAllOrders);

export default orderRouter;