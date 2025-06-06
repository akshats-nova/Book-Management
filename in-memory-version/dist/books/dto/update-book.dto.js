"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookDto = void 0;
const create_book_dto_1 = require("./create-book.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateBookDto extends (0, mapped_types_1.PartialType)(create_book_dto_1.CreateBookDto) {
}
exports.UpdateBookDto = UpdateBookDto;
//# sourceMappingURL=update-book.dto.js.map