import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './account.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';
import { UsersModule } from '../users/user.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    controllers: [AccountController],
    providers: [AccountService, JwtStrategy],
    exports: [AccountService],
})
export class AccountModule { }