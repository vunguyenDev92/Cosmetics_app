import { Document } from 'mongoose';

export interface Account extends Document {
    email: string;
    password: string;
    status: 'active' | 'banned'; // Trạng thái chỉ có hai giá trị: active hoặc banned
    createdAt?: Date;
    updatedAt?: Date;
}