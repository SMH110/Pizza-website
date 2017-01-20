import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const User = new Schema({
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true }
});

User.methods.hashPassword = function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export function validatePassword(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
}

export default model<User & Document>('User', User);

interface User {
    email: string;
    password: string;
}