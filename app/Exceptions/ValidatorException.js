"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorException = void 0;
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
function ValidatorException({ Err, Response, }) {
    const BAD_REQUEST = 400;
    const NOT_FOUND = 404;
    const RULE_EXIST = 'exists';
    const { messages: { errors: [{ message, field, rule }], }, } = Err;
    if (Env_1.default.get('NODE_ENV') == 'development') {
        console.log('Err', Err.messages);
    }
    return Response.status(rule.includes(RULE_EXIST) ? NOT_FOUND : BAD_REQUEST).json({
        status: 'Error',
        message,
        data: {
            field,
            rule,
        },
    });
}
exports.ValidatorException = ValidatorException;
//# sourceMappingURL=ValidatorException.js.map