"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const duplicateBook_Exception_1 = require("./exceptions/duplicateBook.Exception");
let BooksService = class BooksService {
    books = [
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
    ];
    findAll(genre, isAvailable, sortBy) {
        let filteredBooks = this.books;
        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre === genre);
        }
        if (isAvailable !== undefined) {
            filteredBooks = filteredBooks.filter(book => book.isAvailable === isAvailable);
        }
        if (sortBy) {
            filteredBooks = filteredBooks.sort((a, b) => {
                if (sortBy === "publishedDate") {
                    return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
                }
                return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            });
        }
        if (filteredBooks.length === 0) {
            throw new common_1.NotFoundException('No books found matching the criteria');
        }
        return filteredBooks;
    }
    findOne(id) {
        const book = this.books.find(book => book.id === id);
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    create(createBookDto) {
        const isDuplicate = this.books.some(book => createBookDto.title === book.title);
        if (isDuplicate) {
            throw new duplicateBook_Exception_1.DuplicateBookException(createBookDto.title);
        }
        const booksHighestId = [...this.books].sort((a, b) => b.id - a.id);
        const newBook = {
            id: booksHighestId[0].id + 1,
            ...createBookDto
        };
        this.books.push(newBook);
        return newBook;
    }
    update(id, updateBookDto) {
        this.books = this.books.map(book => {
            if (book.id === id) {
                return { ...book, ...updateBookDto };
            }
            return book;
        });
        return this.findOne(id);
    }
    delete(id) {
        const removedBook = this.findOne(id);
        this.books = this.books.filter(book => book.id !== id);
        return removedBook;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map