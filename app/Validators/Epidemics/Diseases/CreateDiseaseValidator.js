"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateDiseaseValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(80),
            ]),
            description: Validator_1.schema.string({ trim: true }, [Validator_1.rules.required()]),
        });
        this.messages = {
            required: `El campo '{{ field }}' es requerido`,
            maxLength: `El campo '{{ field }}' debe de contener como maximo {{ options.maxLength }} caracteres`,
            '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`,
        };
    }
}
exports.default = CreateDiseaseValidator;
//# sourceMappingURL=CreateDiseaseValidator.js.map