import OrderModel from "../models/order.model";


export const createNewOrder = (data: any) => OrderModel.create(data);

export const getAllOrders = () => OrderModel.find().sort({  createdAt: -1 })