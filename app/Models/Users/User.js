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
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const luxon_1 = require("luxon");
const FormatDates_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FormatDates"));
const Role_1 = __importDefault(require("./Role"));
const UsersRole_1 = __importDefault(require("./UsersRole"));
class User extends Orm_1.BaseModel {
    static async hashPassword(user) {
        if (user.$dirty.password) {
            user.password = await Hash_1.default.make(user.password);
        }
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], User.prototype, "rememberMeToken", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Role_1.default, {
        localKey: 'id',
        pivotForeignKey: 'user_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'role_id',
        pivotTable: 'users_roles',
    }),
    __metadata("design:type", Object)
], User.prototype, "roles", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsersRole_1.default, {
        localKey: 'id',
        foreignKey: 'user_id',
    }),
    __metadata("design:type", Object)
], User.prototype, "users_roles", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
exports.default = User;
//# sourceMappingURL=User.js.map