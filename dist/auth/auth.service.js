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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const userCreateDto_dto_1 = require("../user/dto/userCreateDto.dto");
const userDto_dto_1 = require("../user/dto/userDto.dto");
const userLogin_dto_1 = require("../user/dto/userLogin.dto");
const userMapper_mapper_1 = require("../user/shared/userMapper.mapper");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(userCreateDto) {
        let status = {
            status: 'success',
            message: 'User registered successfully',
        };
        try {
            await this.userService.create(userCreateDto);
        }
        catch (err) {
            status = {
                status: 'failure',
                message: err
            };
        }
        return status;
    }
    async login(userLoginDto) {
        const user = await this.userService.findByLogin(userLoginDto);
        const token = this._createToken(user);
        return Object.assign({ username: user.username }, token);
    }
    async validateUser(payload) {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Invalid Token'
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async getUserDetails(req) {
        const { username } = req.user;
        const user = await this.userService.findOne({ username });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Invalid Token'
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    _createToken({ username, role }) {
        const expiresIn = process.env.EXPIRES_IN || '60s';
        const user = { username, role_id: role.id };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map