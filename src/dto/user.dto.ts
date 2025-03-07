import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly phoneNumber: string;

    @IsString()
    @IsOptional()
    readonly avatar?: string; // Avatar là tùy chọn khi tạo người dùng
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly address?: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber?: string;

    @IsString()
    @IsOptional()
    readonly avatar?: string; // Avatar là tùy chọn khi tạo người dùng
}