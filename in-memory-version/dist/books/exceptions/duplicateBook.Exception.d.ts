import { HttpException } from "@nestjs/common";
export declare class DuplicateBookException extends HttpException {
    readonly title: string;
    constructor(title: string);
}
