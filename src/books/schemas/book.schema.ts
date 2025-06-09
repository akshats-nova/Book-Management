/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Author, AuthorSchema} from './author.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({type: [AuthorSchema], required: true })
  authors: Author[];

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  isAvailable: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
