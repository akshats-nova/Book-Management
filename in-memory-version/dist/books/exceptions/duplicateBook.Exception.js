"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateBookException = void 0;
const common_1 = require("@nestjs/common");
class DuplicateBookException extends common_1.HttpException {
    title;
    constructor(title) {
        super(`Book titled '${title}' already exists`, common_1.HttpStatus.CONFLICT);
        this.title = title;
    }
}
exports.DuplicateBookException = DuplicateBookException;
//# sourceMappingURL=duplicateBook.Exception.js.map