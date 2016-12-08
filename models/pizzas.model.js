const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pizzas = new Schema({
    name: String,
    description: String,
    price: [Number],
    subType: [String],
    imageName: String
}
);


module.exports = mongoose.model('pizzas', pizzas);
