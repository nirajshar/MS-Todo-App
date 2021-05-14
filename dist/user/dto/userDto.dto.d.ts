import { RolesEntity } from 'src/roles/entity/roles.entity';
export declare class UserDto {
    id: string;
    username: string;
    email: string;
    createdOn?: Date;
    role?: RolesEntity;
    role_id?: string;
}
