import { Document, Schema, model } from 'mongoose';

export default model<Pizza & Document>('pizzas', new Schema({
    name: String,
    description: String,
    price: { large: Number, medium: Number, small: Number },
    // TODO Why is subType here?
    subType: [String],
    imageName: String
}));