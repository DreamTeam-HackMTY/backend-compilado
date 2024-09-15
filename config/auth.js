"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    guard: 'api',
    guards: {
        api: {
            driver: 'oat',
            tokenProvider: {
                type: 'api',
                driver: 'database',
                table: 'api_tokens',
                foreignKey: 'user_id',
            },
            provider: {
                driver: 'database',
                identifierKey: 'id',
                uids: ['email'],
                usersTable: 'users',
            },
        },
    },
};
exports.default = authConfig;
//# sourceMappingURL=auth.js.map