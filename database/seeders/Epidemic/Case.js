"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Disease_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/Disease"));
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/State"));
const Case_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Epidemic/Case"));
const luxon_1 = require("luxon");
function getRandomDate(start, end) {
    const startTimestamp = start.toMillis();
    const endTimestamp = end.toMillis();
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
        startTimestamp;
    return luxon_1.DateTime.fromMillis(randomTimestamp);
}
class default_1 extends Seeder_1.default {
    async run() {
        const [covidm, infl, dengue, zika] = await Disease_1.default.createMany([
            {
                name: 'COVID-19',
                description: 'COVID-19 is a respiratory illness caused by a virus called SARS-CoV-2. Symptoms often include cough, shortness of breath, fever, chills, muscle pain, sore throat, or new loss of taste or smell.',
                active: true,
            },
            {
                name: 'Influenza',
                description: 'Influenza (flu) is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to death. Flu symptoms include fever, cough, sore throat, and muscle aches.',
                active: true,
            },
            {
                name: 'Dengue',
                description: 'Dengue is a mosquito-borne viral infection causing a severe flu-like illness. It is found in tropical and subtropical climates worldwide, mostly in urban and semi-urban areas.',
                active: true,
            },
            {
                name: 'Zika Virus',
                description: 'Zika virus is primarily transmitted to people through the bite of an infected Aedes species mosquito. Symptoms are usually mild and include fever, rash, and joint pain.',
                active: false,
            },
        ]);
        const states = await State_1.default.createMany([
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
        const diseases = [covidm, infl, dengue, zika];
        const startDate = luxon_1.DateTime.fromISO('2024-01-01T00:00:00');
        const endDate = luxon_1.DateTime.fromISO('2024-12-12T00:00:00');
        for (const state of states) {
            for (const disease of diseases) {
                const randomQuantity = Math.floor(Math.random() * 1000) + 50;
                const randomIsDeaths = Math.random() < 0.5;
                const randomCreatedAt = getRandomDate(startDate, endDate).setZone('America/Monterrey');
                await Case_1.default.create({
                    disease_id: disease.id,
                    state_id: state.id,
                    quantity: randomQuantity,
                    is_deaths: randomIsDeaths,
                    createdAt: randomCreatedAt,
                });
            }
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=Case.js.map