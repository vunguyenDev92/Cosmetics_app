export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    avatar?: string; // Avatar là tùy chọn
    createdAt?: Date;
    updatedAt?: Date;
}