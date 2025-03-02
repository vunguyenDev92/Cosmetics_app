import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './product.dto';



@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async create(productData: Partial<Product>): Promise<Product> {
        const newProduct = new this.productModel(productData);
        return newProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    // Lấy sản phẩm theo ID
    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    // Cập nhật sản phẩm
    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
        if (!updatedProduct) throw new NotFoundException('Product not found');
        return updatedProduct;
    }

    // Xóa sản phẩm
    async remove(id: string): Promise<void> {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Product not found');
    }
}
