"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/State"));
class StatesController {
    async index({ response }) {
        const states = await State_1.default.all();
        return response.ok({
            status: 'Éxito',
            message: 'Estados obtenidos',
            data: states,
        });
    }
    async show({ params, response }) {
        const state = await State_1.default.find(params.id);
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