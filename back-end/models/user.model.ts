import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const User = new Schema({
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true }
});

export function encryptPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return reject(error);
            }
            bcrypt.hash(password, salt, null, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
}

export function validatePassword(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
}

export default model<User & Document>('User', User);

export interface User {
    email: string;
    password: string;
}