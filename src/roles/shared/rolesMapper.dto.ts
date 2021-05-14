import { RolesDto } from "../dto/rolesDto.dto";
import { RolesEntity } from "../entity/roles.entity";




export const toRolesDto = (data: RolesEntity): RolesDto => {  
    const { id, name, createdAt } = data;
    let rolesDto: RolesDto = { id, name, createdAt };
    return rolesDto;
};