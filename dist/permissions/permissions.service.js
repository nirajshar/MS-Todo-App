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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permissions_entity_1 = require("./entity/permissions.entity");
const permissionsMapper_dto_1 = require("./shared/permissionsMapper.dto");
let PermissionsService = class PermissionsService {
    constructor(permissionsRepo) {
        this.permissionsRepo = permissionsRepo;
    }
    async findAll() {
        return this.permissionsRepo.find();
    }
    async findOne(id) {
        const permission = await this.permissionsRepo.findOne({ where: { id } });
        if (!permission) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return permissionsMapper_dto_1.toPermissionsDto(permission);
    }
    async create(permissionsCreateDto) {
        const { name } = permissionsCreateDto;
        const permissionInDb = await this.permissionsRepo.findOne({ where: { name } });
        if (permissionInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: 'Permission already exist'
            }, common_1.HttpStatus.CONFLICT);
        }
        const permission = await this.permissionsRepo.create({
            name
        });
        await this.permissionsRepo.save(permission);
        return {
            status: 'success',
            message: 'Permission created successfully'
        };
    }
    async update(id, permissionsUpdateDto) {
        const permission = await this.permissionsRepo.findOne({ where: { id } });
        if (!permission) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.permissionsRepo.update({ id }, permissionsUpdateDto);
        return {
            status: 'success',
            message: 'Permission updated successfully'
        };
    }
    async delete(id) {
        const permission = await this.permissionsRepo.findOne({ where: { id } });
        if (!permission) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.permissionsRepo.delete({ id });
        return {
            status: common_1.HttpStatus.OK,
            message: 'Permission deleted successfully'
        };
    }
};
PermissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(permissions_entity_1.PermissionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map