"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.get('me', 'AuthController.me');
        Route_1.default.post('logout', 'AuthController.logout');
    }).middleware('auth');
    Route_1.default.post('login', 'AuthController.login');
})
    .namespace('App/Controllers/Http/Auth')
    .prefix('api/v1/auth');
//# sourceMappingURL=Auth.js.map