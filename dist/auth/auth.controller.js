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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const userCreateDto_dto_1 = require("../user/dto/userCreateDto.dto");
const userLogin_dto_1 = require("../user/dto/userLogin.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("./guards/jwt-guard");
const roles_guard_1 = require("./guards/roles.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(createUserDto) {
        const result = await this.authService.register(createUserDto);
        if (result.status === 'failure') {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: result.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async login(userLoginDto) {
        return await this.authService.login(userLoginDto);
    }
    async testAuth(req) {
        return await this.authService.getUserDetails(req);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'User registered successfully' }),
    swagger_1.ApiResponse({ status: 409, description: 'Username already exist' }),
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userCreateDto_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'User logged in' }),
    swagger_1.ApiResponse({ status: 404, description: 'User not found' }),
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userLogin_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'User details' }),
    swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
    common_1.Get('whoami'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testAuth", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map