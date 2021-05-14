import { GrantRevokeDto } from './dto/grantRevokeDto.dto';
import { RolesCreateDto } from './dto/rolesCreate.dto';
import { RolesUpdateDto } from './dto/rolesUpdate.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RolesService);
    findAll(): Promise<import("./dto/rolesDto.dto").RolesDto[]>;
    findOne(id: string): Promise<import("./dto/rolesDto.dto").RolesDto>;
    create(rolesCreateDto: RolesCreateDto): Promise<{
        status: string;
        message: string;
        role: import("./dto/rolesDto.dto").RolesDto;
    }>;
    update(id: string, rolesUpdateDto: RolesUpdateDto): Promise<object>;
    delete(id: string): Promise<object>;
    grantPermissionsToRole(id: string, permissions: GrantRevokeDto[]): Promise<object>;
    revokePermissionsFromRole(id: string, permissions: GrantRevokeDto[]): Promise<object>;
}
