"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Users/Role"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Users/User"));
class default_1 extends Seeder_1.default {
    async run() {
        const [DEV, ADMIN] = await Role_1.default.createMany([
            {
                name: 'DEV',
                active: true,
            },
            {
                name: 'ADMIN',
                active: true,
            },
            {
                name: 'ESPECIALISTA',
                active: true,
            },
            {
                name: 'INVITADO',
                active: true,
            },
        ]);
        const [dev, admin] = await User_1.default.createMany([
            {
                email: 'dev@example.com',
                username: 'dev',
                password: 'dev.pass',
                active: true,
            },
            {
                email: 'admin@example.com',
                username: 'admin',
                password: 'admin.pass',
                active: true,
            },
        ]);
        await dev.related('roles').attach([DEV.id]);
        await admin.related('roles').attach([ADMIN.id]);
    }
}
exports.default = default_1;
//# sourceMappingURL=UsersAndRole.js.map