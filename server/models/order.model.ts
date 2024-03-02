import mongoose, { Document, Model, Schema } from "mongoose";


export interface Order extends Document {
    courseId: string;
    userId: string;
    payment_info: object;
}

const orderSchema = new Schema<Order>({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    payment_info: {
        type: Object,
        // required: true
    }
}, { timestamps: true });

const OrderModel: Model<Order> = mongoose.model('Order', orderSchema);

export default OrderModel;