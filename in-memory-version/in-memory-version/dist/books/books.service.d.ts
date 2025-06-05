import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private books;
    findAll(genre?: 'FICTION' | 'NON-FICTION' | 'HISTORY' | 'SELF-HELP', isAvailable?: boolean, sortBy?: 'title' | 'author' | 'publishedDate'): {
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
