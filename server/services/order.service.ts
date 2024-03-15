import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";
import UserModel from "../models/user.model";
import { generateLastYearData } from "../utils/analytics.generator";


export const createNewOrder = (data: any) => OrderModel.create(data);

export const getAllOrders = async () => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 }).populate([
            { path: 'userId', model: UserModel, select: 'firstName lastName' },
            { path: 'courseId', model: CourseModel, select: 'name' }
        ]).exec();

        // Modify orders to include concatenated name
        const ordersWithNames = orders.map(order => {
            const user = order.userId as any; // Cast userId as any to avoid TypeScript errors
            const course = order.courseId as any; // Cast courseId as any
            const fullName = user.firstName + ' ' + user.lastName;
            return {
                ...order.toObject(),
                user: {
                    _id: user._id,
                    name: fullName
                },
                course: {
                    _id: course._id,
                    name: course.name
                }
            };
        }).map(({ courseId, userId, ...rest }) => rest);;

        return ordersWithNames;
    } catch (error: any) {
        throw new Error(`Error fetching orders: ${error.message}`);
    }
}

export const getOrderAnalytics = () => generateLastYearData(OrderModel);