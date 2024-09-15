"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthMiddleware {
    async handle({ auth, response }, next) {
        const apiAuth = auth.use('api');
        const isAuth = await apiAuth.check();
        if (!isAuth) {
            const { isAuthenticated } = auth.use('api');
            return response.unauthorized({
                status: 'Error',
                message: 'Sesión expirada o token inválido',
                data: {
                    isAuthenticated,
                },
            });
        }
        await next();
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=Auth.js.map