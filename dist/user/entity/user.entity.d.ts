import { RolesEntity } from "src/roles/entity/roles.entity";
export declare class UserEntity {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    role: RolesEntity;
    hashPassword(): Promise<void>;
}
