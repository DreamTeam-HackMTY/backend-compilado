"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateDiseaseValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Epidemics/Diseases/CreateDiseaseValidator"));
const UpdateDiseaseValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Epidemics/Diseases/UpdateDiseaseValidator"));
const ValidatorException_1 = global[Symbol.for('ioc.use')]("App/Exceptions/ValidatorException");
const Disease_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/Disease"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class DiseasesController {
    constructor() {
        this.diseases = Disease_1.default.query().preload('cases').orderBy('id', 'desc');
    }
    async index({ response }) {
        const diseasesList = await this.diseases;
        const result = diseasesList
            .map((disease) => {
            const totalCases = disease.cases.length;
            const deaths = disease.cases.filter((c) => c.is_deaths).length;
            return {
                ...disease.toJSON(),
                total_cases: totalCases,
                deaths: deaths,
            };
        })
            .map((disease) => {
            delete disease.cases;
            return disease;
        });
        return response.ok({
            status: 'Éxito',
            message: 'Enfermedades obtenidas',
            data: result,
        });
    }
    async show({ params, response }) {
        const disease = await this.diseases.where('id', params.id).first();
        if (!disease) {
            return response.notFound({
                status: 'Error',
                message: 'Enfermedad no encontrada',
                data: null,
            });
        }
        const totalCases = disease.cases.length;
        const deaths = disease.cases.filter((c) => c.is_deaths).length;
        const { cases, ...disease_data } = disease.toJSON();
        return response.ok({
            status: 'Éxito',
            message: 'Enfermedad obtenida',
            data: {
                ...disease_data,
                total_cases: totalCases,
                deaths: deaths,
            },
        });
    }
    async store(ctx) {
        const { request, response } = ctx;
        try {
            await request.validate(CreateDiseaseValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const data = request.only(['name', 'description']);
        let disease;
        const trx = await Database_1.default.transaction();
        try {
            disease = await Disease_1.default.create({
                ...data,
                active: true,
            });
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            return response.internalServerError({
                status: 'Error',
                message: 'Error al guardar la enfermedad',
                data: null,
            });
        }
        return response.created({
            status: 'Éxito',
            message: 'Enfermedad creada',
            data: disease,
        });
    }
    async update(ctx) {
        const { request, response, params } = ctx;
        try {
            await request.validate(UpdateDiseaseValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const data = request.only(['name', 'description']);
        const disease = await Disease_1.default.find(params.id);
        if (!disease) {
            return response.notFound({
                status: 'Error',
                message: 'Enfermedad no encontrada',
                data: null,
            });
        }
        const trx = await Database_1.default.transaction();
        try {
            await disease.useTransaction(trx).merge(data).save();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            return response.internalServerError({
                status: 'Error',
                message: 'Error al actualizar la enfermedad',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Enfermedad actualizada',
            data: disease,
        });
    }
    async destroy({ params, response }) {
        const disease = await Disease_1.default.find(params.id);
        if (!disease) {
            return response.notFound({
                status: 'Error',
                message: 'Enfermedad no encontrada',
                data: null,
            });
        }
        const trx = await Database_1.default.transaction();
        try {
            await disease
                .useTransaction(trx)
                .merge({ active: !disease.active })
                .save();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            return response.internalServerError({
                status: 'Error',
                message: 'Error al eliminar la enfermedad',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Enfermedad eliminada',
            data: disease,
        });
    }
}
exports.default = DiseasesController;
//# sourceMappingURL=DiseasesController.js.map