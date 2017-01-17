import { Schema, model } from 'mongoose';

export default model('sides', new Schema({
    name: String,
    price: Number,
    imageName: String
}));