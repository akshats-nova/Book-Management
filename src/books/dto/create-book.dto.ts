/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

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
