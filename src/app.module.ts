import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    // Đọc biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường có thể truy cập toàn cục
      envFilePath: '.env', // Đảm bảo đọc file .env
    }),

    // Kết nối MongoDB với URI từ biến môi trường
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI is not defined in .env file');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),

    // Đăng ký PassportModule với chiến lược mặc định là 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Import các module khác
    ProductModule,
    UsersModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }