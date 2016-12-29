const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pizzas = new Schema({
    name: String,
    description: String,
    price: { large: Number, medium: Number, small: Number },
    subType: [String],
    imageName: String
});


module.exports = mongoose.model('pizzas', pizzas);