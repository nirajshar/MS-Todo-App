import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserEntity } from './entity/user.entity';
import { UserCreateDto } from './dto/userCreateDto.dto';
import { RolesEntity } from 'src/roles/entity/roles.entity';
export declare class UserService {
    private readonly userRepo;
    private readonly rolesRepo;
    constructor(userRepo: Repository<UserEntity>, rolesRepo: Repository<RolesEntity>);
    findOne(options?: object): Promise<UserDto>;
    findByLogin({ username, password }: UserLoginDto): Promise<UserDto>;
    findByPayload({ username }: any): Promise<UserDto>;
    create(userDto: UserCreateDto): Promise<UserDto>;
    assignRole(id: string, role_id: string): Promise<object>;
    revokeRole(id: string, role_id: string): Promise<object>;
}
