"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Users/CreateUserValidator"));
const ValidatorException_1 = global[Symbol.for('ioc.use')]("App/Exceptions/ValidatorException");
const CodeGenerator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/CodeGenerator"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Users/User"));
const SenderMail_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/SenderMail"));
const UpdateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Users/UpdateUserValidator"));
const Sanitizer_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Sanitizer"));
class UsersController {
    constructor() {
        this.users = User_1.default.query()
            .where({ active: true })
            .preload('roles')
            .orderBy('id', 'desc');
    }
    async index({ response }) {
        return response.ok({
            status: 'Éxito',
            message: 'Usuarios obtenidos',
            data: await this.users,
        });
    }
    async show({ params, response }) {
        const user = await this.users.where('id', params.id).first();
        if (!user) {
            return response.notFound({
                status: 'Error',
                message: 'Usuario no encontrado',
                data: null,
            });
        }
        return response.ok({
            status: 'Éxito',
            message: 'Usuario obtenido',
            data: user,
        });
    }
    async store(ctx) {
        const { request, response } = ctx;
        try {
            await request.validate(CreateUserValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const { role_id, ...data_user } = request.only([
            'email',
            'username',
            'role_id',
        ]);
        const { code } = CodeGenerator_1.default.codeGenerator({
            length: 15,
            type: 'string',
        });
        let user;
        const trx = await Database_1.default.transaction();
        try {
            user = await User_1.default.create({ ...data_user, password: code, active: true }, { client: trx });
            await user.related('roles').attach([role_id], trx);
            const sender_mail = new SenderMail_1.default({
                user,
                subject: `Bienvenido a Epidemidata, ${user.username}`,
                view: 'emails/Passwords/view_password',
                data: {
                    title: 'Bienvenido a Epidemidata.',
                    password: code,
                },
            });
            await sender_mail.send();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            Logger_1.default.error(error);
            return response.internalServerError({
                status: 'Error',
                message: 'Error al crear usuario o enviar el correo',
                data: null,
            });
        }
        return response.created({
            status: 'Éxito',
            message: 'Usuario creado',
            data: user,
        });
    }
    async update(ctx) {
        const { params, request, response } = ctx;
        try {
            await request.validate(UpdateUserValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Err: error, Response: response });
        }
        const { role_id, ...user_data } = Sanitizer_1.default.filter({
            data: request.only(['email', 'username', 'role_id']),
            removeNullAndUndefined: true,
        });
        const user = await User_1.default.query().where({ id: params.id }).first();
        if (!user) {
            return response.notFound({
                status: 'Error',
                message: 'Usuario no encontrado',
                data: null,
            });
        }
        if (user_data.email) {
            const existEmail = await User_1.default.query()
                .where({ email: user_data.email })
                .whereNot({ id: user.id })
                .first();
            if (existEmail) {
                return response.badRequest({
                    status: 'Error',
                    message: 'El email ingresado ya existe',
                    data: null,
                });
            }
        }
        const trx = await Database_1.default.transaction();
        try {
            user.useTransaction(trx);
            await user.merge(user_data).save();
            if (role_id) {
                await user.related('roles').sync([role_id]);
            }
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            Logger_1.default.error(error);
            return response.internalServerError({
                status: 'Error',
                message: 'Error al actualizar usuario',
                data: null,
            });
        }
        const user_updated = await this.users.where({ id: user.id }).first();
        return response.ok({
            status: 'Éxito',
            message: 'Usuario actualizado',
            data: user_updated,
        });
    }
    async destroy({ params, response }) {
        const user = await User_1.default.find(params.id);
        if (!user) {
            return response.notFound({
                status: 'Error',
                message: 'Usuario no encontrado',
                data: null,
            });
        }
        const trx = await Database_1.default.transaction();
        try {
            user.useTransaction(trx);
            await user.merge({ active: !user.active }).save();
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            Logger_1.default.error(error);
            return response.internalServerError({
                status: 'Error',
                message: 'Error al desactivar/activar usuario',
                data: null,
            });
        }
        const user_desactivated = await this.users.where({ id: user.id }).first();
        return response.ok({
            status: 'Éxito',
            message: `Usuario ${user.active ? 'activado' : 'desactivado'}`,
            data: user_desactivated,
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map