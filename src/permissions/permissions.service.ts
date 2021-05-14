import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsDto } from './dto/permissionsDto.dto';
import { PermissionsCreateDto } from './dto/permissionsCreateDto.dto';
import { PermissionsUpdateDto } from './dto/permissionsUpdateDto.dto';
import { PermissionsEntity } from './entity/permissions.entity';
import { toPermissionsDto } from './shared/permissionsMapper.dto';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(PermissionsEntity) private readonly permissionsRepo: Repository<PermissionsEntity>,
    ) { }

    async findAll(): Promise<PermissionsDto[]> {
        return this.permissionsRepo.find();
    }

    async findOne(id: string): Promise<PermissionsDto> {        
        const permission = await this.permissionsRepo.findOne({ where: { id } });
        
        if (!permission) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, HttpStatus.NOT_FOUND)
        }

        return toPermissionsDto(permission);
    }

    async create(permissionsCreateDto: PermissionsCreateDto) {
        const { name } = permissionsCreateDto;        

        const permissionInDb = await this.permissionsRepo.findOne({ where: { name } });

        if (permissionInDb) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                message: 'Permission already exist'
            }, HttpStatus.CONFLICT);
        }

        const permission: PermissionsEntity = await this.permissionsRepo.create({
            name
        });

        await this.permissionsRepo.save(permission);

        return {
            status: 'success',
            message: 'Permission created successfully'
        };
    }

    async update(id: string, permissionsUpdateDto: PermissionsUpdateDto): Promise<object> {
        const permission = await this.permissionsRepo.findOne({ where: { id } });

        if (!permission) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, HttpStatus.NOT_FOUND)
        }

        await this.permissionsRepo.update({ id }, permissionsUpdateDto);

       
        return {
            status: 'success',
            message: 'Permission updated successfully'
        }

    }

    async delete(id: string): Promise<object> {

        const permission = await this.permissionsRepo.findOne({ where: { id } });

        if (!permission) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'Permission not found'
            }, HttpStatus.NOT_FOUND);
        }

        await this.permissionsRepo.delete({ id });

        return {
            status: HttpStatus.OK,
            message: 'Permission deleted successfully'
        };
    }

}
