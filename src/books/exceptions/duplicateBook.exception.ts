/* eslint-disable prettier/prettier */


import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateBookException extends HttpException {
    constructor(public readonly title: string){
        super(`Book titled '${title}' already exists`, HttpStatus.CONFLICT);
    }
}