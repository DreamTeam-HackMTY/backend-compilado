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
const Disease_1 = __importDefault(require("./Disease"));
const State_1 = __importDefault(require("./State"));
class Case extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({
        isPrimary: true,
    }),
    __metadata("design:type", Number)
], Case.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)({
        serializeAs: null,
    }),
    __metadata("design:type", Number)
], Case.prototype, "disease_id", void 0);
__decorate([
    (0, Orm_1.column)({
        serializeAs: null,
    }),
    __metadata("design:type", Number)
], Case.prototype, "state_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Case.prototype, "quantity", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Case.prototype, "is_deaths", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Case.prototype, "active", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], Case.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        ...FormatDates_1.default.serializeDates(),
    }),
    __metadata("design:type", luxon_1.DateTime)
], Case.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Disease_1.default, {
        localKey: 'id',
        foreignKey: 'disease_id',
    }),
    __metadata("design:type", Object)
], Case.prototype, "disease", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => State_1.default, {
        localKey: 'id',
        foreignKey: 'state_id',
    }),
    __metadata("design:type", Object)
], Case.prototype, "state", void 0);
exports.default = Case;
//# sourceMappingURL=Case.js.map