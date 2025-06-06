/* eslint-disable prettier/prettier */

import { HttpCode, HttpStatus, BadRequestException, Controller, Query, ValidationPipe, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
   constructor( private readonly booksService: BooksService) {}
   
   @Get()
   async findAll(
    @Query('genre') genre?: 'FICTION' | 'NON-FICTION' | 'HISTORY' | 'SELF-HELP', 
    @Query('isAvailable') isAvailable?: string,
    @Query('sortBy') sortBy?: 'title' | 'author' | 'publishedDate') {
        let availability: boolean | undefined;
        if(isAvailable!==undefined){
            const value = isAvailable.toLowerCase();
            if(value==="true" || value==="yes") availability=true;
            else if(value==="false" || value==="no") availability=false;
            else throw new BadRequestException("Invalid value for availability, enter true/false or yes/no")
        }
        return this.booksService.findAll(genre, availability, sortBy);
   }
   @Get(':id')
   async findOne(@Param('id') id:string){
        return this.booksService.findOne(id);
   }

   @Post()
   @HttpCode(HttpStatus.CREATED)
   async create(@Body(ValidationPipe) createBookDto: CreateBookDto){
    return this.booksService.create(createBookDto);
   }

   @Put(':id')
   async update(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto){
        return this.booksService.update(id, updateBookDto);
   }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.booksService.delete(id)
    }

}
