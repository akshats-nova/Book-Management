/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DuplicateBookException } from './exceptions/duplicateBook.exception';

@Injectable()
export class BooksService {

    private books=[
        {
            id: 1,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            publishedDate: new Date("1987-09-04"),
            genre: "FICTION",
            isAvailable: true
        },

        {
            id: 4,
            title: "The Psychology of Money",
            author: "Morgan Housel",
            publishedDate: new Date("2020-09-08"),
            genre: "NON-FICTION",
            isAvailable: false
        },
        {
            id: 3,
            title: "Wuthering Heights",
            author: "Emily Brontë",
            publishedDate: new Date("1847-11-24"),
            genre: "FICTION",
            isAvailable: true
        },
        {
            id: 2,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            publishedDate: new Date("1925-04-10"),
            genre: "FICTION",
            isAvailable: false
        }
    ]
    
    findAll(
        genre?: 'FICTION' | 'NON-FICTION' | 'HISTORY' | 'SELF-HELP',
        isAvailable?: boolean,
        sortBy?: 'title' | 'author' | 'publishedDate'
    ){
        let filteredBooks = this.books;
        if(genre){
            filteredBooks = filteredBooks.filter(book => book.genre===genre);
        }
        if(isAvailable!==undefined){
            filteredBooks=filteredBooks.filter(book => book.isAvailable===isAvailable);
        }
        if(sortBy){
            filteredBooks=filteredBooks.sort((a,b)=>{
                if(sortBy==="publishedDate"){
                    return new Date(a.publishedDate).getTime()- new Date(b.publishedDate).getTime();
                }
                return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            })
        }
        if(filteredBooks.length===0){
            throw new NotFoundException('No books found matching the criteria');
        }
        return filteredBooks;
    }

    findOne(id:number){
        const book=this.books.find(book=> book.id===id)
        if(!book) throw new NotFoundException('Book not found')
        return book;
    }

    create(createBookDto: CreateBookDto){

        const isDuplicate = this.books.some(book=> createBookDto.title===book.title)
        if(isDuplicate){
            throw new DuplicateBookException(createBookDto.title)
        }

        const booksHighestId = [...this.books].sort((a,b)=> b.id-a.id)
        const newBook={
            id: booksHighestId[0].id + 1,
            ...createBookDto
        }
        this.books.push(newBook)
        return newBook
    }

    update(id: number, updateBookDto: UpdateBookDto){
        this.books=this.books.map(book=>{
            if(book.id===id){
                return {...book, ...updateBookDto}
            }
            return book;
        })
        return this.findOne(id);
    }

    delete(id:number){
        const removedBook = this.findOne(id)
        this.books = this.books.filter(book=> book.id!==id)
        return removedBook;
    }
}
