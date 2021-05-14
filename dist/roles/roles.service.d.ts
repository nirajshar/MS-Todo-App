import { Repository } from 'typeorm';
import { RolesCreateDto } from './dto/rolesCreate.dto';
import { RolesUpdateDto } from './dto/rolesUpdate.dto';
import { RolesDto } from './dto/rolesDto.dto';
import { RolesEntity } from './entity/roles.entity';
import { PermissionsEntity } from 'src/permissions/entity/permissions.entity';
import { GrantRevokeDto } from './dto/grantRevokeDto.dto';
export declare class RolesService {
    private readonly rolesRepo;
    private readonly permissionsRepo;
    constructor(rolesRepo: Repository<RolesEntity>, permissionsRepo: Repository<PermissionsEntity>);
    findAll(): Promise<RolesDto[]>;
    findOne(id: string): Promise<RolesDto>;
    create(rolesCreateDto: RolesCreateDto): Promise<{
        status: string;
        message: string;
        role: RolesDto;
    }>;
    update(id: string, rolesUpdateDto: RolesUpdateDto): Promise<object>;
    delete(id: string): Promise<object>;
    grantPermissionsToRole(id: string, permissions: GrantRevokeDto[]): Promise<object>;
    revokePermissionsFromRole(id: string, permissions: GrantRevokeDto[]): Promise<object>;
}
