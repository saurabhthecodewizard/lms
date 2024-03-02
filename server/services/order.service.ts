import OrderModel from "../models/order.model";
import { generateLastYearData } from "../utils/analytics.generator";


export const createNewOrder = (data: any) => OrderModel.create(data);

export const getAllOrders = () => OrderModel.find().sort({  createdAt: -1 })

export const getOrderAnalytics = () => generateLastYearData(OrderModel);