import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
@Module({
  imports: [
    ConfigModule.forRoot(), // Đọc biến môi trường từ .env
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/default'), // Kết nối MongoDB
    ProductModule, // Import các module khác
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
