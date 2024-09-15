"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const ValidatorException_1 = global[Symbol.for('ioc.use')]("App/Exceptions/ValidatorException");
const Case_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/Case"));
const CreateCaseValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Epidemics/Cases/CreateCaseValidator"));
class CasesController {
    constructor() {
        this.cases = Case_1.default.query()
            .preload('disease')
            .preload('state')
            .orderBy('created_at', 'desc');
    }
    async index({ response }) {
        return response.ok({
            status: 'Éxito',
            message: 'Casos de enfermedades en estados',
            data: await this.cases,
        });
    }
    async show({ params, response }) {
        const _case = await this.cases.where('id', params.id).first();
        if (!_case) {
            return response.notFound({
                status: 'Error',
                message: 'Caso no encontrado',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Caso encontrado',
            data: _case,
        });
    }
    async store(ctx) {
        const { request, response } = ctx;
        try {
            await request.validate(CreateCaseValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const data = request.only([
            'disease_id',
            'state_id',
            'quantity',
            'is_deaths',
        ]);
        let _case;
        const trx = await Database_1.default.transaction();
        try {
            _case = await Case_1.default.create({ ...data, active: true }, { client: trx });
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            console.error(error);
            return response.internalServerError({
                status: 'Error',
                message: 'No se pudo crear el caso',
                data: null,
            });
        }
        return response.created({
            status: 'Éxito',
            message: 'Caso creado',
            data: _case,
        });
    }
    async update(ctx) {
        const { params, request, response } = ctx;
        try {
            await request.validate(CreateCaseValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const data = request.only([
            'disease_id',
            'state_id',
            'quantity',
            'is_deaths',
        ]);
        const _case = await Case_1.default.find(params.id);
        if (!_case) {
            return response.notFound({
                status: 'Error',
                message: 'Caso no encontrado',
                data: null,
            });
        }
        const trx = await Database_1.default.transaction();
        try {
            await _case.useTransaction(trx).merge(data).save();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            return response.badRequest({
                status: 'Error',
                message: 'No se pudo actualizar el caso',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Caso actualizado',
            data: _case,
        });
    }
    async destroy({ params, response }) {
        const _case = await Case_1.default.find(params.id);
        if (!_case) {
            return response.notFound({
                status: 'Error',
                message: 'Caso no encontrado',
                data: null,
            });
        }
        const trx = await Database_1.default.transaction();
        try {
            await _case.useTransaction(trx).merge({ active: !_case.active }).save();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            return response.badRequest({
                status: 'Error',
                message: 'No se pudo eliminar el caso',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: `Caso ${_case.active ? 'eliminado' : 'restaurado'}`,
            data: _case,
        });
    }
}
exports.default = CasesController;
//# sourceMappingURL=CasesController.js.map