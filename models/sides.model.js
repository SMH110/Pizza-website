const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sideItem = new Schema({
    name: String,
    price: Number,
    imageName: String
});

module.exports = mongoose.model('sides', sideItem);
//