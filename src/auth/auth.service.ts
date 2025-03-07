import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { AccountService } from '../account/account.service';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const { email, ...userData } = createUserDto;
        const password = createUserDto['password'];

        if (!password) {
            throw new UnauthorizedException('Password is required');
        }

        // Kiểm tra xem email đã tồn tại trong accounts chưa
        try {
            const existingAccount = await this.accountService.findByEmail(email);
            if (existingAccount) {
                throw new BadRequestException('Email already exists in accounts');
            }
        } catch (error) {
            if (!(error instanceof UnauthorizedException)) {
                throw error; // Ném lại lỗi nếu không phải lỗi NotFound
            }
        }

        // Kiểm tra xem email đã tồn tại trong users chưa
        try {
            const existingUser = await this.usersService.findByEmail(email);
            if (existingUser) {
                throw new BadRequestException('Email already exists in users');
            }
        } catch (error) {
            if (!(error instanceof UnauthorizedException)) {
                throw error;
            }
        }

        // Tạo Account
        const createAccountDto = { email, password };
        const account = await this.accountService.create(createAccountDto);

        // Tạo User
        const user = await this.usersService.create({ email, ...userData });

        return this.generateToken(account, user);
    }

    async login(loginDto: LoginDto) {
        const account = await this.accountService.findByEmail(loginDto.email);
        if (!account || !(await bcrypt.compare(loginDto.password, account.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (account.status === 'banned') {
            throw new UnauthorizedException('Account is banned');
        }

        const user = await this.usersService.findByEmail(loginDto.email);
        return this.generateToken(account, user);
    }

    private generateToken(account: any, user: any) {
        const payload = { email: account.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async findByEmail(email: string) {
        return this.accountService.findByEmail(email);
    }
}