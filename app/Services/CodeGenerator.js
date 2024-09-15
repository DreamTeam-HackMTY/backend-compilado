"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const FormatDates_1 = __importDefault(require("./FormatDates"));
class CodeGenerator {
    constructor() {
        return this;
    }
    generateRandomNumber(length) {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += Math.floor(0 + Math.random() * 9).toString();
        }
        return code;
    }
    codeGenerator({ type, length, }) {
        const full_code = {
            number: this.generateRandomNumber,
            string: Helpers_1.string.generateRandom,
            both: (len) => `${this.generateRandomNumber(len)}-${Helpers_1.string.generateRandom(len)}`,
        };
        const start = FormatDates_1.default.now();
        const due = start.plus({ days: 1 });
        return {
            code: full_code[type](length),
            start_date: FormatDates_1.default.serializeDates().serialize(start),
            due_date: FormatDates_1.default.serializeDates().serialize(due),
        };
    }
    isCodeExpired({ due_date }) {
        const now = FormatDates_1.default.now();
        return now >= due_date;
    }
}
exports.default = new CodeGenerator();
//# sourceMappingURL=CodeGenerator.js.map