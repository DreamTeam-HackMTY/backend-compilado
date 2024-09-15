"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/State"));
class StateSeeder extends Seeder_1.default {
    async run() {
        await State_1.default.createMany([
            { name: 'Aguascalientes' },
            { name: 'Baja California' },
            { name: 'Baja California Sur' },
            { name: 'Campeche' },
            { name: 'Chiapas' },
            { name: 'Chihuahua' },
            { name: 'Ciudad de México' },
            { name: 'Coahuila' },
            { name: 'Colima' },
            { name: 'Durango' },
            { name: 'Estado de México' },
            { name: 'Guanajuato' },
            { name: 'Guerrero' },
            { name: 'Hidalgo' },
            { name: 'Jalisco' },
            { name: 'Michoacán' },
            { name: 'Morelos' },
            { name: 'Nayarit' },
            { name: 'Nuevo León' },
            { name: 'Oaxaca' },
            { name: 'Puebla' },
            { name: 'Querétaro' },
            { name: 'Quintana Roo' },
            { name: 'San Luis Potosí' },
            { name: 'Sinaloa' },
            { name: 'Sonora' },
            { name: 'Tabasco' },
            { name: 'Tamaulipas' },
            { name: 'Tlaxcala' },
            { name: 'Veracruz' },
            { name: 'Yucatán' },
            { name: 'Zacatecas' },
        ]);
    }
}
exports.default = StateSeeder;
//# sourceMappingURL=State.js.map