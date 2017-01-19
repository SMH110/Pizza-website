import { Document, Schema, model } from 'mongoose';

export default model<Drink & Document>('drinks', new Schema({
    name: String,
    price: Number,
    imageName: String
}));