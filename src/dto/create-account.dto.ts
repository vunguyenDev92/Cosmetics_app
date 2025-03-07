import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateAccountDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(['active', 'banned'])
    status?: 'active' | 'banned';
}