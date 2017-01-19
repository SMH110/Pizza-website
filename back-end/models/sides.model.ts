import { Document, Schema, model } from 'mongoose';

export default model<Side & Document>('sides', new Schema({
    name: String,
    price: Number,
    imageName: String
}));