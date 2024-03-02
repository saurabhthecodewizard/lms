import OrderModel from "../models/order.model";


export const createNewOrder = (data: any) => OrderModel.create(data);