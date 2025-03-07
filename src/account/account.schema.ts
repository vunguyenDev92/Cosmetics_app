import { Schema } from 'mongoose';

export const AccountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'banned'], default: 'active' }, // Mặc định là active
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});