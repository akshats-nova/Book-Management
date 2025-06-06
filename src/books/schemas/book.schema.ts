import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  isAvailable: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
