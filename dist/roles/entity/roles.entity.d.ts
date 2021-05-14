import { PermissionsEntity } from "src/permissions/entity/permissions.entity";
import { UserEntity } from "src/user/entity/user.entity";
export declare class RolesEntity {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    owns: PermissionsEntity[];
    user: UserEntity[];
}
