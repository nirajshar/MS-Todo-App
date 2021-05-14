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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesEntity = void 0;
const permissions_entity_1 = require("../../permissions/entity/permissions.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
let RolesEntity = class RolesEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RolesEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], RolesEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], RolesEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], RolesEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToMany(type => permissions_entity_1.PermissionsEntity, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], RolesEntity.prototype, "owns", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", Array)
], RolesEntity.prototype, "user", void 0);
RolesEntity = __decorate([
    typeorm_1.Entity('roles')
], RolesEntity);
exports.RolesEntity = RolesEntity;
//# sourceMappingURL=roles.entity.js.map