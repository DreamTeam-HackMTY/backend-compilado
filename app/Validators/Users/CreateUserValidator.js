"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.email(),
                Validator_1.rules.maxLength(80),
                Validator_1.rules.unique({
                    table: 'users',
                    column: 'email',
                }),
            ]),
            username: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(75),
            ]),
            role_id: Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.unsigned(),
                Validator_1.rules.exists({ table: 'roles', column: 'id' }),
            ]),
        });
        this.messages = {
            required: `El campo '{{ field }}' es requerido`,
            email: 'Formato de email no valido',
            unique: 'El email ingresado ya existe',
            maxLength: `El campo '{{ field }}' debe de contener como maximo {{ options.maxLength }} caracteres`,
            '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`,
        };
    }
}
exports.default = CreateUserValidator;
//# sourceMappingURL=CreateUserValidator.js.map