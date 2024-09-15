"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Users/Role"));
class RolesController {
    async index({ response }) {
        const roles = await Role_1.default.all();
        return response.ok({
            status: 'Éxito',
            message: 'Roles obtenidos',
            data: roles,
        });
    }
    async show({ params, response }) {
        const role = await Role_1.default.find(params.id);
        if (!role) {
            return response.notFound({
                status: 'Error',
                message: 'Rol no encontrado',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Rol obtenido',
            data: role,
        });
    }
}
exports.default = RolesController;
//# sourceMappingURL=RolesController.js.map