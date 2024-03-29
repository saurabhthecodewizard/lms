import CourseModel from "../models/course.model";
import OrderModel, { Order } from "../models/order.model";
import UserModel from "../models/user.model";
import { generateLastYearData } from "../utils/analytics.generator";


export const createNewOrder = (data: any) => OrderModel.create(data);

export const getAllOrders = async () => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 }).populate([
            { path: 'userId', model: UserModel, select: 'firstName lastName' },
            { path: 'courseId', model: CourseModel, select: 'name price' }
        ]).exec();

        // Modify orders to include concatenated name
        const ordersWithNames = orders.map(order => {
            const user = order.userId as any; // Cast userId as any to avoid TypeScript errors
            const course = order.courseId as any; // Cast courseId as any
            const fullName = user.firstName + ' ' + user.lastName;
            const price = course.price;
            return {
                ...order.toObject(),
                userFullName: fullName,
                courseName: course.name,
                price,
            };
        }).map(({ courseId, userId, ...rest }) => rest);;

        return ordersWithNames;
    } catch (error: any) {
        throw new Error(`Error fetching orders: ${error.message}`);
    }
}

export const getOrderById = (razorpayOrderId: string) => OrderModel.findOne({ orderId: razorpayOrderId });

export const saveOrder = (order: Order) => order.save();

export const getOrderAnalytics = () => generateLastYearData(OrderModel, { status: 'success' });