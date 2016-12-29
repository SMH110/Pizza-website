const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let drinkItem = new Schema({
    name: String,
    price: Number,
    imageName: String
});

module.exports = mongoose.model('drinks', drinkItem);