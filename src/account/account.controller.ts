import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginAccountDto } from '../dto/login-account.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post('register')
    async register(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.create(createAccountDto);
    }

    @Post('login')
    async login(@Body() loginAccountDto: LoginAccountDto) {
        return this.accountService.login(loginAccountDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}