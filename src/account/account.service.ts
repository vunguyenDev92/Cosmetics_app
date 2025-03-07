import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../interfaces/account.interface';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginAccountDto } from '../dto/login-account.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('Account') private accountModel: Model<Account>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const { password, email, status } = createAccountDto;

        // Kiểm tra xem email đã tồn tại trong accounts chưa
        const existingAccount = await this.accountModel.findOne({ email }).exec();
        if (existingAccount) {
            throw new BadRequestException('Email already exists in accounts');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAccount = new this.accountModel({
            email,
            password: hashedPassword,
            status: status || 'active',
        });
        return createdAccount.save();
    }

    async findByEmail(email: string): Promise<Account> {
        const account = await this.accountModel.findOne({ email }).exec();
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        return account;
    }

    async login(loginAccountDto: LoginAccountDto) {
        const account = await this.findByEmail(loginAccountDto.email);
        if (!account || !(await bcrypt.compare(loginAccountDto.password, account.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (account.status === 'banned') {
            throw new UnauthorizedException('Account is banned');
        }
        const user = await this.usersService.findByEmail(loginAccountDto.email);
        return this.generateToken(account, user);
    }

    private generateToken(account: Account, user: any) {
        const payload = { email: account.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}