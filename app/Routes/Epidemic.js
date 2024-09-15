"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.resource('diseases', 'DiseasesController').apiOnly();
    Route_1.default.resource('states', 'StatesController').only(['index', 'show']);
    Route_1.default.resource('cases', 'CasesController').apiOnly();
})
    .namespace('App/Controllers/Http/Epidemics')
    .prefix('api/v1')
    .middleware('auth');
//# sourceMappingURL=Epidemic.js.map