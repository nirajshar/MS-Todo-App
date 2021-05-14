import { PermissionsCreateDto } from './dto/permissionsCreateDto.dto';
import { PermissionsUpdateDto } from './dto/permissionsUpdateDto.dto';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<import("./dto/permissionsDto.dto").PermissionsDto[]>;
    findOne(id: string): Promise<import("./dto/permissionsDto.dto").PermissionsDto>;
    create(permissionsCreateDto: PermissionsCreateDto): Promise<{
        status: string;
        message: string;
    }>;
    update(id: string, permissionsUpdateDto: PermissionsUpdateDto): Promise<object>;
    delete(id: string): Promise<object>;
}
