import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(genre?: 'FICTION' | 'NON-FICTION' | 'HISTORY' | 'SELF-HELP', isAvailable?: string, sortBy?: 'title' | 'author' | 'publishedDate'): {
        id: number;
        title: string;
        author: string;
        publishedDate: Date;
        genre: string;
        isAvailable: boolean;
    }[];
    findOne(id: number): {
        id: number;
        title: string;
        author: string;
        publishedDate: Date;
        genre: string;
        isAvailable: boolean;
    };
    create(createBookDto: CreateBookDto): {
        title: string;
        author: string;
        publishedDate: Date;
        genre: string;
        isAvailable: boolean;
        id: number;
    };
    update(id: number, updateBookDto: UpdateBookDto): {
        id: number;
        title: string;
        author: string;
        publishedDate: Date;
        genre: string;
        isAvailable: boolean;
    };
    delete(id: number): {
        id: number;
        title: string;
        author: string;
        publishedDate: Date;
        genre: string;
        isAvailable: boolean;
    };
}
