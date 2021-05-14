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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const permissionsCreateDto_dto_1 = require("./dto/permissionsCreateDto.dto");
const permissionsUpdateDto_dto_1 = require("./dto/permissionsUpdateDto.dto");
const permissions_service_1 = require("./permissions.service");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    async findAll() {
        return this.permissionsService.findAll();
    }
    async findOne(id) {
        return this.permissionsService.findOne(id);
    }
    async create(permissionsCreateDto) {
        return this.permissionsService.create(permissionsCreateDto);
    }
    async update(id, permissionsUpdateDto) {
        return this.permissionsService.update(id, permissionsUpdateDto);
    }
    async delete(id) {
        return this.permissionsService.delete(id);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Get all Permissions in Array of Object' }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Get Permissions details by ID' }),
    swagger_1.ApiResponse({ status: 404, description: 'Role not found' }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'Permission created successfully' }),
    swagger_1.ApiResponse({ status: 409, description: 'Permission already exist' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissionsCreateDto_dto_1.PermissionsCreateDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "create", null);
__decorate([
    swagger_1.ApiResponse({ status: 204, description: 'Permission updated successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Permission not found' }),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, permissionsUpdateDto_dto_1.PermissionsUpdateDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Permissions deleted successfully' }),
    swagger_1.ApiResponse({ status: 404, description: 'Permissions not found' }),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "delete", null);
PermissionsController = __decorate([
    swagger_1.ApiTags('Permissions'),
    common_1.Controller('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map