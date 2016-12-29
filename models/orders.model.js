const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
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
    totalPayment: Number
});

module.exports = mongoose.model('orders', orders);