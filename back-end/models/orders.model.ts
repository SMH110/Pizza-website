import { Document, Schema, model } from 'mongoose';

// TODO: Why are we using mongoose? What value do we get from maintaining these schemas?
export default model<Order & Document>('orders', new Schema({
    buyer: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    },
    deliveryAddress: {
        line1: String,
        line2: String,
        town: String,
        postCode: String
    },
    orderItems: [{
        name: String,
        quantity: Number,
        price: Number,
        version: String,
        imageName: String,
        description: String
    }],
    deliveryMethod: String,
    date: Date,
    paymentMethod: String,
    paymentId: String,
    total: Number,
    discount: Number,
    totalPayment: Number,
    status: String
}));