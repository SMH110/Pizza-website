import { Document, Schema, model } from 'mongoose';

export default model<Order & Document>('orders', new Schema({
    buyer: {
        firstName: String,
        lastName: String,
        address: String,
        postCode: String,
        email: String,
        phone: String
    },
    orderItems: [Schema.Types.Mixed],
    deliveryMethod: String,
    date: Date,
    paymentMethod: String,
    total: Number,
    discount: Number,
    totalPayment: Number,
    status: { type: String, default: "Outstanding" }
}));