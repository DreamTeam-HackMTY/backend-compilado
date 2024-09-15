"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/State"));
class StatesController {
    constructor() {
        this.states = State_1.default.query().where({ active: true }).orderBy('id', 'desc');
    }
    async index({ request, response }) {
        const { disease_id } = request.qs();
        if (disease_id) {
            const disease_id_number = parseInt(disease_id);
            if (isNaN(disease_id_number)) {
                return response.badRequest({
                    status: 'Error',
                    message: 'El ID de la enfermedad debe ser un número',
                    data: null,
                });
            }
            const states_list = await this.states.preload('cases', (casesQuery) => {
                casesQuery.preload('disease').where('disease_id', disease_id);
            });
            const result = states_list.map((state) => {
                const totalCases = state.cases.reduce((sum, _case) => sum + _case.quantity, 0);
                const deaths = state.cases
                    .filter((_case) => _case.is_deaths)
                    .reduce((sum, _case) => sum + _case.quantity, 0);
                const { cases, ...state_data } = state.toJSON();
                return {
                    ...state_data,
                    total_cases: totalCases,
                    deaths: deaths,
                };
            });
            return response.ok({
                status: 'Éxito',
                message: 'Estados obtenidos',
                data: result,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Estados obtenidos',
            data: await this.states,
        });
    }
    async show({ params, response }) {
        const state = await this.states.where('id', params.id).first();
        if (!state) {
            return response.notFound({
                status: 'Error',
                message: 'Estado no encontrado',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Estado obtenido',
            data: state,
        });
    }
}
exports.default = StatesController;
//# sourceMappingURL=StatesController.js.map