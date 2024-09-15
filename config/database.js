"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const fs_1 = __importDefault(require("fs"));
const cert = Env_1.default.get('DB_CERT');
let connection = {
    host: Env_1.default.get('PG_HOST'),
    port: Env_1.default.get('PG_PORT'),
    user: Env_1.default.get('PG_USER'),
    password: Env_1.default.get('PG_PASSWORD', ''),
    database: Env_1.default.get('PG_DB_NAME'),
};
if (cert) {
    connection.ssl = {
        rejectUnauthorized: Env_1.default.get('NODE_ENV') == 'production' ? true : false,
        ca: fs_1.default.readFileSync(cert),
    };
}
const databaseConfig = {
    connection: Env_1.default.get('DB_CONNECTION'),
    connections: {
        pg: {
            client: 'pg',
            connection,
            migrations: {
                naturalSort: true,
                paths: [
                    './database/migrations/Users/NoForeign',
                    './database/migrations/Epidemic/NoForeign',
                    './database/migrations/Users/Foreign',
                    './database/migrations/Epidemic/Foreign',
                ],
            },
            seeders: {
                paths: ['./database/seeders/Users', './database/seeders/Epidemic'],
            },
            healthCheck: true,
            debug: Env_1.default.get('DB_DEBUG', false),
        },
        alters: {
            client: 'pg',
            connection,
            migrations: {
                naturalSort: true,
                paths: [
                    './database/migrations/Alters',
                ],
            },
            healthCheck: true,
            debug: Env_1.default.get('DB_DEBUG', false),
        },
    },
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map