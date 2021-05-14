import { GrantRevokeRoleDto } from './dto/grantRevokeRoleDto.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    assignRole(id: string, role: GrantRevokeRoleDto): Promise<object>;
    revokeRole(id: string, role: GrantRevokeRoleDto): Promise<object>;
}
