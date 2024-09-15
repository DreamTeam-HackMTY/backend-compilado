"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const FormatDates_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FormatDates"));
const luxon_1 = require("luxon");
const User_1 = __importDefault(require("../Users/User"));
class ApiToken extends Orm_1.BaseModel {
    static async setApiTokenInRequest({ token, apiRequest, }) {
        apiRequest.request.headers.authorization = `Bearer ${token}`;
    }
    static async formatExpiresAt({ tokenHash }) {
        if (!tokenHash)
            return null;
        const api_token = await this.query().where({ token: tokenHash }).first();
        if (!api_token || !api_token.expiresAt)
            return null;
        return FormatDates_1.default.serializeDates().serialize(api_token.expiresAt);
    }
    static async revokeApiToken({ currentUser }) {
        await this.query().where({ user_id: currentUser.id }).delete();
        await currentUser.merge({ rememberMeToken: null }).save();
        const revoked = await this.query().where({ user_id: currentUser.id });
        return revoked.length == 0;
    }
    static async getApiToken({ authAttempt: { token, type, expiresAt }, currentUser, }) {
        await currentUser.merge({ rememberMeToken: token }).save();
        return {
            type,
            token,
            expiresAt: FormatDates_1.default.serializeDates().serialize(expiresAt),
        };
    }
}
__decorate([
    (0, Orm_1.column)({
        isPrimary: true,
    }),
    __metadata("design:type", Number)
], ApiToken.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)({
        serializeAs: null,
    }),
    __metadata("design:type", Number)
], ApiToken.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ApiToken.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ApiToken.prototype, "type", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ApiToken.prototype, "token", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], ApiToken.prototype, "expiresAt", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], ApiToken.prototype, "createdAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'user_id',
    }),
    __metadata("design:type", Object)
], ApiToken.prototype, "user", void 0);
exports.default = ApiToken;
//# sourceMappingURL=ApiToken.js.map