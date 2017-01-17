import { Schema, model } from 'mongoose';

export default model('drinks', new Schema({
    name: String,
    price: Number,
    imageName: String
}));