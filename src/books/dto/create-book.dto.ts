/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsEmail,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthorDto)
  authors: AuthorDto[];

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  publishedDate: Date;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
}
