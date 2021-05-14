import { PermissionsEntity } from "../entity/permissions.entity";
import { PermissionsDto } from "../dto/permissionsDto.dto";

export const toPermissionsDto = (data: PermissionsEntity): PermissionsDto => {  
    const { id, name, createdAt } = data;
    let rolesDto: PermissionsDto = { id, name, createdAt };
    return rolesDto;
};