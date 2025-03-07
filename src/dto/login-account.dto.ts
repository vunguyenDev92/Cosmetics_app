import { IsString, IsEmail } from 'class-validator';

export class LoginAccountDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}