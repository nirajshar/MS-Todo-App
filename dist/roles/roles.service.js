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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("./entity/roles.entity");
const rolesMapper_dto_1 = require("./shared/rolesMapper.dto");
const permissions_entity_1 = require("../permissions/entity/permissions.entity");
let RolesService = class RolesService {
    constructor(rolesRepo, permissionsRepo) {
        this.rolesRepo = rolesRepo;
        this.permissionsRepo = permissionsRepo;
    }
    async findAll() {
        return this.rolesRepo.find({ relations: ['owns'] });
    }
    async findOne(id) {
        const role = await this.rolesRepo.findOne({ where: { id } });
        if (!role) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return rolesMapper_dto_1.toRolesDto(role);
    }
    async create(rolesCreateDto) {
        const { name } = rolesCreateDto;
        const roleInDb = await this.rolesRepo.findOne({ where: { name } });
        if (roleInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: 'Role already exist'
            }, common_1.HttpStatus.CONFLICT);
        }
        const role = await this.rolesRepo.create({
            name
        });
        let roleCreated = await this.rolesRepo.save(role);
        return {
            status: 'success',
            message: 'Role created successfully',
            role: rolesMapper_dto_1.toRolesDto(roleCreated)
        };
    }
    async update(id, rolesUpdateDto) {
        const role = await this.rolesRepo.findOne({ where: { id } });
        if (!role) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.rolesRepo.update({ id }, rolesUpdateDto);
        let roleUpdated = await this.rolesRepo.findOne({ where: { id } });
        return {
            status: 'success',
            message: 'Role updated successfully',
            role: rolesMapper_dto_1.toRolesDto(roleUpdated)
        };
    }
    async delete(id) {
        const role = await this.rolesRepo.findOne({ where: { id } });
        if (!role) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.rolesRepo.delete({ id });
        return {
            status: common_1.HttpStatus.OK,
            message: 'Role deleted successfully',
            role: rolesMapper_dto_1.toRolesDto(role)
        };
    }
    async grantPermissionsToRole(id, permissions) {
        let role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });
        if (!role) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (permissions.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Permissions to attach required'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        for (let i = 0; i < permissions.length; i++) {
            const newPermission = await this.permissionsRepo.findOne({ where: { id: permissions[i]['id'] } });
            if (newPermission) {
                if (role.owns.filter(permission => permission.id === newPermission.id).length < 1) {
                    role.owns.push(newPermission);
                    await this.rolesRepo.save(role);
                }
                else {
                    throw new common_1.HttpException('Permission already assigned', common_1.HttpStatus.BAD_REQUEST);
                }
            }
        }
        role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });
        return {
            role: rolesMapper_dto_1.toRolesDto(role)
        };
    }
    async revokePermissionsFromRole(id, permissions) {
        let role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });
        if (!role) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (permissions.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Permissions to attach required'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        for (let i = 0; i < permissions.length; i++) {
            const oldPermission = await this.permissionsRepo.findOne({ where: { id: permissions[i]['id'] } });
            if (oldPermission) {
                if (role.owns.filter(permission => permission.id === oldPermission.id).length > 0) {
                    role.owns = role.owns.filter(permission => permission.id !== oldPermission.id);
                    await this.rolesRepo.save(role);
                }
                else {
                    throw new common_1.HttpException('Permission not assigned', common_1.HttpStatus.BAD_REQUEST);
                }
            }
        }
        role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });
        return {
            role: rolesMapper_dto_1.toRolesDto(role)
        };
    }
};
RolesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __param(1, typeorm_1.InjectRepository(permissions_entity_1.PermissionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map