import { Repository } from 'typeorm';
import { PermissionsDto } from './dto/permissionsDto.dto';
import { PermissionsCreateDto } from './dto/permissionsCreateDto.dto';
import { PermissionsUpdateDto } from './dto/permissionsUpdateDto.dto';
import { PermissionsEntity } from './entity/permissions.entity';
export declare class PermissionsService {
    private readonly permissionsRepo;
    constructor(permissionsRepo: Repository<PermissionsEntity>);
    findAll(): Promise<PermissionsDto[]>;
    findOne(id: string): Promise<PermissionsDto>;
    create(permissionsCreateDto: PermissionsCreateDto): Promise<{
        status: string;
        message: string;
    }>;
    update(id: string, permissionsUpdateDto: PermissionsUpdateDto): Promise<object>;
    delete(id: string): Promise<object>;
}
