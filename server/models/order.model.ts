import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId; // Use ObjectId for userId
    courseId: mongoose.Types.ObjectId; // Use ObjectId for courseId
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for courseId
        required: true,
        ref: 'Course', // Assuming 'Course' is the model name
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for userId
        required: true,
        ref: 'User', // Assuming 'User' is the model name
    },
    payment_info: {
        type: Object,
    },
}, { timestamps: true });

const OrderModel: Model<IOrder> = mongoose.model('Order', orderSchema);

export default OrderModel;
