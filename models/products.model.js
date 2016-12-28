const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let products = new Schema({
    name: String,
    imageUrl: String,
    price: Number,
    size: { type: Schema.Types.Mixed, default: null },
    type: String,
    description: { type: Schema.Types.Mixed, default: null }

})

module.exports = mongoose.model('products', products);