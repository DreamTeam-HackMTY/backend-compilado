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
const UsersRole_1 = __importDefault(require("./UsersRole"));
const User_1 = __importDefault(require("./User"));
class Role extends Orm_1.BaseModel {
    static getRoles() {
        return this.ROLES;
    }
}
Role.ROLES = {
    DEV: 1,
    ADMIN: 2,
    ESPECIALISTA: 3,
    INVITADO: 4,
};
__decorate([
    (0, Orm_1.column)({
        isPrimary: true,
    }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Role.prototype, "active", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => User_1.default, {
        localKey: 'id',
        pivotForeignKey: 'role_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'user_id',
        pivotTable: 'users_roles',
    }),
    __metadata("design:type", Object)
], Role.prototype, "users", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => UsersRole_1.default, {
        localKey: 'id',
        foreignKey: 'role_id',
    }),
    __metadata("design:type", Object)
], Role.prototype, "users_roles", void 0);
exports.default = Role;
//# sourceMappingURL=Role.js.map