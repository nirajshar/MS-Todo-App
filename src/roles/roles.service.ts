import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesCreateDto } from './dto/rolesCreate.dto';
import { RolesUpdateDto } from './dto/rolesUpdate.dto';
import { RolesDto } from './dto/rolesDto.dto';
import { RolesEntity } from './entity/roles.entity';
import { toRolesDto } from './shared/rolesMapper.dto';
import { PermissionsEntity } from 'src/permissions/entity/permissions.entity';
import { GrantRevokeDto } from './dto/grantRevokeDto.dto';


@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RolesEntity) private readonly rolesRepo: Repository<RolesEntity>,
        @InjectRepository(PermissionsEntity) private readonly permissionsRepo: Repository<PermissionsEntity>
    ) { }

    async findAll(): Promise<RolesDto[]> {
        return this.rolesRepo.find({ relations: ['owns'] });
    }

    async findOne(id: string): Promise<RolesDto> {
        const role = await this.rolesRepo.findOne({ where: { id } });

        if (!role) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, HttpStatus.NOT_FOUND)
        }

        return toRolesDto(role);
    }

    async create(rolesCreateDto: RolesCreateDto) {
        const { name } = rolesCreateDto;

        const roleInDb = await this.rolesRepo.findOne({ where: { name } });

        if (roleInDb) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                message: 'Role already exist'
            }, HttpStatus.CONFLICT);
        }

        const role: RolesEntity = await this.rolesRepo.create({
            name
        });

        let roleCreated = await this.rolesRepo.save(role);

        return {
            status: 'success',
            message: 'Role created successfully',
            role: toRolesDto(roleCreated)
        };
    }

    async update(id: string, rolesUpdateDto: RolesUpdateDto): Promise<object> {
        const role = await this.rolesRepo.findOne({ where: { id } });

        if (!role) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, HttpStatus.NOT_FOUND)
        }

        await this.rolesRepo.update({ id }, rolesUpdateDto);
        let roleUpdated = await this.rolesRepo.findOne({ where: { id } });


        return {
            status: 'success',
            message: 'Role updated successfully',
            role: toRolesDto(roleUpdated)
        }

    }

    async delete(id: string): Promise<object> {

        const role: RolesEntity = await this.rolesRepo.findOne({ where: { id } });

        if (!role) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, HttpStatus.NOT_FOUND);
        }

        await this.rolesRepo.delete({ id });

        return {
            status: HttpStatus.OK,
            message: 'Role deleted successfully',
            role: toRolesDto(role)
        };
    }


    async grantPermissionsToRole(id: string, permissions: GrantRevokeDto[]): Promise<object> {
        
        let role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });
        // console.log(permissions);

        if (!role) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, HttpStatus.NOT_FOUND)
        }

        if (permissions.length === 0) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Permissions to attach required'
            }, HttpStatus.NOT_FOUND)
        }

        for (let i = 0; i < permissions.length; i++) {

            const newPermission = await this.permissionsRepo.findOne({ where: { id: permissions[i]['id'] } });           

            if (newPermission) {

                if (role.owns.filter(permission => permission.id === newPermission.id).length < 1) {
                    role.owns.push(newPermission);
                    await this.rolesRepo.save(role);
                } else {
                    throw new HttpException('Permission already assigned', HttpStatus.BAD_REQUEST);
                }

            }

        }


        role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });    

        return {
            role: toRolesDto(role)
        }
    }

    async revokePermissionsFromRole(id: string, permissions: GrantRevokeDto[]): Promise<object> {

        let role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });        

        if (!role) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Role not found'
            }, HttpStatus.NOT_FOUND)
        }

        if (permissions.length === 0) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Permissions to attach required'
            }, HttpStatus.NOT_FOUND)
        }

        for (let i = 0; i < permissions.length; i++) {

            const oldPermission = await this.permissionsRepo.findOne({ where: { id: permissions[i]['id'] } });           

            if (oldPermission) {

                if (role.owns.filter(permission => permission.id === oldPermission.id).length > 0) {
                    role.owns = role.owns.filter(permission => permission.id !== oldPermission.id);
                    await this.rolesRepo.save(role);
                } else {
                    throw new HttpException('Permission not assigned', HttpStatus.BAD_REQUEST);
                }

            }

        }

        role = await this.rolesRepo.findOne({ where: { id: id }, relations: ['owns'] });    

        return {
            role: toRolesDto(role)
        }

    }

}
