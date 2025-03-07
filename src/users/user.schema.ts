import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    avatar: { type: String, required: false }, // Avatar không bắt buộc
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});