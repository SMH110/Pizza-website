import { Schema, model } from 'mongoose';

export default model('pizzas', new Schema({
    name: String,
    description: String,
    price: { large: Number, medium: Number, small: Number },
    subType: [String],
    imageName: String
}));