/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DuplicateBookException } from './exceptions/duplicateBook.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    // private books=[
    //     {
    //         id: 1,
    //         title: "Norwegian Wood",
    //         author: "Haruki Murakami",
    //         publishedDate: new Date("1987-09-04"),
    //         genre: "FICTION",
    //         isAvailable: true
    //     },

    //     {
    //         id: 4,
    //         title: "The Psychology of Money",
    //         author: "Morgan Housel",
    //         publishedDate: new Date("2020-09-08"),
    //         genre: "NON-FICTION",
    //         isAvailable: false
    //     },
    //     {
    //         id: 3,
    //         title: "Wuthering Heights",
    //         author: "Emily Brontë",
    //         publishedDate: new Date("1847-11-24"),
    //         genre: "FICTION",
    //         isAvailable: true
    //     },
    //     {
    //         id: 2,
    //         title: "The Great Gatsby",
    //         author: "F. Scott Fitzgerald",
    //         publishedDate: new Date("1925-04-10"),
    //         genre: "FICTION",
    //         isAvailable: false
    //     }
    // ]
    
    async findAll(
        genre?: 'FICTION' | 'NON-FICTION' | 'HISTORY' | 'SELF-HELP',
        isAvailable?: boolean,
        sortBy?: 'title' | 'author' | 'publishedDate'
    ): Promise<Book []> {
        const filter: any = {};
        if(genre){
            filter.genre=genre;
        }
        if(isAvailable!==undefined){
            filter.isAvailable=isAvailable;
        }
        const sort: any = {};
        if(sortBy){
            if(sortBy!=="author" && sortBy!=="title" && sortBy!=="publishedDate") throw new BadRequestException("Invalid field for sortBy")
            if(sortBy) sort[sortBy]=1;
        }
        const books = await this.bookModel.find(filter).sort(sort).exec();
        if(books.length===0){
            throw new NotFoundException('No books found matching the criteria');
        }
        return books;
    }

    async findOne(id:string): Promise<Book> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        const book= await this.bookModel.findById(id).exec();
        if(!book) throw new NotFoundException('Book not found')
        return book;
    }

    async create(createBookDto: CreateBookDto): Promise<Book>{

        const isDuplicate = await this.bookModel.findOne({title: createBookDto.title})
        if(isDuplicate){
            throw new DuplicateBookException(createBookDto.title)
        }

        const lastBook = await this.bookModel.findOne().sort({ id: -1 }).exec();
        const nextId = lastBook ? lastBook.id + 1 : 1;
        const newBook=new this.bookModel({
            id: nextId,
            ...createBookDto
        });
        
        return await newBook.save();
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book>{
            const updatedBook = await this.bookModel.findOneAndUpdate(
            { id },
            updateBookDto,
            { new: true },
            );

            if (!updatedBook) throw new NotFoundException('Book not found');
            return updatedBook;
    }

    async delete(id:string): Promise<Book>{
        const deletedBook = await this.bookModel.findOneAndDelete({ id }).exec();
        if (!deletedBook) throw new NotFoundException('Book not found');
        return deletedBook;
    }
}
