"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class AuthValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(80),
                Validator_1.rules.email(),
            ]),
            password: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(15),
            ]),
        });
        this.messages = {
            required: `El campo '{{ field }}' es requerido`,
            email: `El formato del campo '{{ field }}' no es valido`,
            maxLength: `El campo '{{ field }}' debe de contener como maximo {{ options.maxLength }} caracteres`,
            '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`,
        };
    }
}
exports.default = AuthValidator;
//# sourceMappingURL=AuthValidator.js.map