import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    imageUrl: string;

    @Prop({ required: true })
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
