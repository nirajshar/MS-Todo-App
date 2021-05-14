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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grantRevokeDto_dto_1 = require("./dto/grantRevokeDto.dto");
const rolesCreate_dto_1 = require("./dto/rolesCreate.dto");
const rolesUpdate_dto_1 = require("./dto/rolesUpdate.dto");
const roles_service_1 = require("./roles.service");
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async findAll() {
        return this.roleService.findAll();
    }
    async findOne(id) {
        return this.roleService.findOne(id);
    }
    async create(rolesCreateDto) {
        return this.roleService.create(rolesCreateDto);
    }
    async update(id, rolesUpdateDto) {
        return this.roleService.update(id, rolesUpdateDto);
    }
    async delete(id) {
        return this.roleService.delete(id);
    }
    async grantPermissionsToRole(id, permissions) {
        return this.roleService.grantPermissionsToRole(id, permissions);
    }
    async revokePermissionsFromRole(id, permissions) {
        return this.roleService.revokePermissionsFromRole(id, permissions);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Get all Roles in Array of Object' }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Get Role details by ID' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'Role created successfully' }),
    swagger_1.ApiResponse({ status: 409, description: 'Role already exist' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rolesCreate_dto_1.RolesCreateDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    swagger_1.ApiResponse({ status: 204, description: 'Role updated successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rolesUpdate_dto_1.RolesUpdateDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Role deleted successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Grant Permissions to Role' }),
    swagger_1.ApiBody({ type: [grantRevokeDto_dto_1.GrantRevokeDto] }),
    swagger_1.ApiResponse({ status: 201, description: 'Permissions granted to Role successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Post(':id/grant'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "grantPermissionsToRole", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Revoke Permissions from Role' }),
    swagger_1.ApiBody({ type: [grantRevokeDto_dto_1.GrantRevokeDto] }),
    swagger_1.ApiResponse({ status: 200, description: 'Permissions revoked from Role successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Post(':id/revoke'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "revokePermissionsFromRole", null);
RolesController = __decorate([
    swagger_1.ApiTags('Roles'),
    common_1.Controller('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map