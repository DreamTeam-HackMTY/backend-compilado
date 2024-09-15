"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateCaseValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            disease_id: Validator_1.schema.number([
                Validator_1.rules.exists({ table: 'diseases', column: 'id' }),
            ]),
            state_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'states', column: 'id' })]),
            quantity: Validator_1.schema.number([Validator_1.rules.required()]),
            is_deaths: Validator_1.schema.boolean([Validator_1.rules.required()]),
        });
        this.messages = {
            required: `El campo '{{ field }}' es requerido`,
            exists: `El campo '{{ field }}' no encontro el elemento en la base de datos`,
            '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`,
        };
    }
}
exports.default = CreateCaseValidator;
//# sourceMappingURL=CreateCaseValidator.js.map