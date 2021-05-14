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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const userMapper_mapper_1 = require("./shared/userMapper.mapper");
const bcrypt = require("bcrypt");
const roles_entity_1 = require("../roles/entity/roles.entity");
let UserService = class UserService {
    constructor(userRepo, rolesRepo) {
        this.userRepo = userRepo;
        this.rolesRepo = rolesRepo;
    }
    async findOne(options) {
        const user = await this.userRepo.findOne(options);
        return userMapper_mapper_1.toUserDto(user);
    }
    async findByLogin({ username, password }) {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['role'] });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'User not found'
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const pwdCheck = await bcrypt.compare(password, user.password);
        if (!pwdCheck) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Username / Password incorrect !'
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return userMapper_mapper_1.toUserDto(user);
    }
    async findByPayload({ username }) {
        return await this.userRepo.findOne({ where: { username }, relations: ['role'] });
    }
    async create(userDto) {
        const { username, password, email } = userDto;
        let { role_id } = userDto;
        const userInDb = await this.userRepo.findOne({ where: { username } });
        if (userInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'User already exists'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        let role;
        if (role_id) {
            role = await this.rolesRepo.findOne({ where: { id: role_id } });
            if (!role) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'Role does not exists'
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const user = await this.userRepo.create({
            username,
            password,
            email,
            role
        });
        await this.userRepo.save(user);
        return userMapper_mapper_1.toUserDto(user);
    }
    async assignRole(id, role_id) {
        const userInDb = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
        if (!userInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'User does not exists'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const roleInDb = await this.rolesRepo.findOne({ where: { id: role_id } });
        if (!roleInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Role does not exists'
            }, common_1.HttpStatus.CONFLICT);
        }
        if (userInDb.role === null || (userInDb.role.hasOwnProperty('id') && userInDb.role.id !== roleInDb.id)) {
            userInDb.role = roleInDb;
            await this.userRepo.save(userInDb);
        }
        else {
            throw new common_1.HttpException('Role already assigned', common_1.HttpStatus.CONFLICT);
        }
        const userData = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
        return userMapper_mapper_1.toUserDto(userData);
    }
    async revokeRole(id, role_id) {
        const userInDb = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
        if (!userInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'User does not exists'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const roleInDb = await this.rolesRepo.findOne({ where: { id: role_id } });
        if (!roleInDb) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Role does not exists'
            }, common_1.HttpStatus.CONFLICT);
        }
        if (userInDb.role === null) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Role not assigned yet'
            }, common_1.HttpStatus.CONFLICT);
        }
        if (userInDb.role.id === roleInDb.id) {
            userInDb.role = null;
            await this.userRepo.save(userInDb);
        }
        else {
            throw new common_1.HttpException('Role not assigned', common_1.HttpStatus.BAD_REQUEST);
        }
        const userData = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
        return userMapper_mapper_1.toUserDto(userData);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map