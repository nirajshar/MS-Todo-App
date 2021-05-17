import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserEntity } from './entity/user.entity';
import { toUserDto } from './shared/userMapper.mapper';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/userCreateDto.dto';
import { RolesEntity } from 'src/roles/entity/roles.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(RolesEntity) private readonly rolesRepo: Repository<RolesEntity>,
    ) { }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);        
        return toUserDto(user);
    }

    async findByLogin({ username, password }: UserLoginDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['role'] });

        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found'
            }, HttpStatus.NOT_FOUND);
        }

        const pwdCheck = await bcrypt.compare(password, user.password);

        if (!pwdCheck) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Username / Password incorrect !'
            }, HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.userRepo.findOne({ where: { username }, relations: ['role'] });
    }

    async create(userDto: UserCreateDto): Promise<UserDto> {
        const { username, password, email } = userDto;
        let { role_id } = userDto;

        // Check if User exists in the DB
        const userInDb = await this.userRepo.findOne({ where: { username } });

        if (userInDb) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User already exists'
            }, HttpStatus.BAD_REQUEST)
        }

        let role: any;

        if (role_id) {
            role = await this.rolesRepo.findOne({ where: { id: role_id } });

            if (!role) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Role does not exists'
                }, HttpStatus.BAD_REQUEST)
            }
        }

        const user: UserEntity = await this.userRepo.create({
            username,
            password,
            email,
            role
        });

        await this.userRepo.save(user);

        return toUserDto(user);
    }

    // ## ACL 
    async assignRole(id: string, role_id: string): Promise<object> {

        // Check if User exists in the DB
        const userInDb = await this.userRepo.findOne({ where: { id }, relations: ['role'] });

        if (!userInDb) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User does not exists'
            }, HttpStatus.BAD_REQUEST)
        }

        const roleInDb = await this.rolesRepo.findOne({ where: { id: role_id } });

        if (!roleInDb) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Role does not exists'
            }, HttpStatus.CONFLICT)
        }       
       
        if (userInDb.role === null || ( userInDb.role.hasOwnProperty('id') && userInDb.role.id !== roleInDb.id ) ) {
            userInDb.role = roleInDb
            await this.userRepo.save(userInDb);
        } else {            
            throw new HttpException('Role already assigned', HttpStatus.CONFLICT);            
        }

        const userData = await this.userRepo.findOne({ where: { id }, relations: ['role'] });

        return toUserDto(userData);
    }

    async revokeRole(id: string, role_id: string): Promise<object> {

        // Check if User exists in the DB
        const userInDb = await this.userRepo.findOne({ where: { id }, relations: ['role'] });

        if (!userInDb) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User does not exists'
            }, HttpStatus.BAD_REQUEST)
        }

        const roleInDb = await this.rolesRepo.findOne({ where: { id: role_id } });

        if (!roleInDb) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Role does not exists'
            }, HttpStatus.CONFLICT)
        }

        if (userInDb.role === null) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Role not assigned yet'
            }, HttpStatus.CONFLICT)
        }

        if (userInDb.role.id === roleInDb.id) {
            userInDb.role = null;
            await this.userRepo.save(userInDb);
        } else {
            throw new HttpException('Role not assigned', HttpStatus.BAD_REQUEST);
        }

        const userData = await this.userRepo.findOne({ where: { id }, relations: ['role'] });

        return toUserDto(userData);
    }

}
