"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorException_1 = global[Symbol.for('ioc.use')]("App/Exceptions/ValidatorException");
const ApiToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Auth/ApiToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Users/User"));
const AuthValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/AuthValidator"));
class AuthController {
    async login(ctx) {
        const { auth, request, response } = ctx;
        const apiAuth = auth.use('api');
        try {
            await request.validate(AuthValidator_1.default);
        }
        catch (error) {
            return (0, ValidatorException_1.ValidatorException)({ Response: response, Err: error });
        }
        const { email, password } = request.only(['email', 'password']);
        try {
            await apiAuth.verifyCredentials(email, password);
        }
        catch (error) {
            return response.badRequest({
                status: 'Error',
                message: 'Credenciales incorrectas',
                data: null,
            });
        }
        const user = await User_1.default.query().preload('roles').where({ email }).first();
        if (!user || !user.active) {
            return response.notFound({
                status: 'Error',
                message: 'Usuario no encontrado',
                data: null,
            });
        }
        if (user.rememberMeToken) {
            await ApiToken_1.default.setApiTokenInRequest({
                token: user.rememberMeToken,
                apiRequest: request,
            });
            const isValidToken = await apiAuth.check();
            if (isValidToken) {
                const expires_at = await ApiToken_1.default.formatExpiresAt({
                    tokenHash: apiAuth.token?.tokenHash,
                });
                return response.ok({
                    status: 'Éxito',
                    message: 'Ya existe una sesión activa',
                    data: {
                        type: 'bearer',
                        token: user.rememberMeToken,
                        expiresAt: expires_at,
                    },
                });
            }
            await ApiToken_1.default.revokeApiToken({ currentUser: user });
        }
        const apiAuthAttempt = await apiAuth.attempt(email, password, {
            expiresIn: '30 days',
        });
        const apiToken = await ApiToken_1.default.getApiToken({
            authAttempt: apiAuthAttempt,
            currentUser: user,
        });
        return response.ok({
            status: 'Éxito',
            message: 'Inicio de sesión éxitoso',
            data: apiToken,
        });
    }
    async logout({ auth, response }) {
        const { user } = auth.use('api');
        const user_model = await User_1.default.find(user?.id);
        const revoked = await ApiToken_1.default.revokeApiToken({
            currentUser: user_model,
        });
        return response.ok({
            status: 'Éxito',
            message: 'Sesiones cerradas éxitosamente',
            data: {
                tokensRevoked: revoked,
            },
        });
    }
    async me({ auth, response }) {
        const { user } = auth.use('api');
        const user_model = await User_1.default.query()
            .where({ id: user?.id })
            .preload('roles')
            .first();
        return response.ok({
            status: 'Éxito',
            message: 'Datos del usuario actual',
            data: user_model,
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map