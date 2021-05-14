import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrantRevokeRoleDto } from './dto/grantRevokeRoleDto.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    // @Post('show')
    // async findByLogin(@Body() userLoginDto: UserLoginDto) {
    //     return await this.userService.findByLogin(userLoginDto);
    // }

    // @Post('create')
    // async create(@Body() userCreateDto: UserCreateDto) {
    //     return await this.userService.create(userCreateDto);
    // }    

    @ApiOperation({ summary: 'Assign Role to a User' })
    @ApiBody({ type: GrantRevokeRoleDto })
    @ApiResponse({ status: 200, description: 'Role granted to User successfully' })
    @ApiResponse({ status: 404, description: 'Role not found | User not found' })
    @Post(':id/role/grant')
    async assignRole(@Param('id') id: string, @Body() role: GrantRevokeRoleDto) {
        return this.userService.assignRole(id, role.role_id);
    }

    @ApiOperation({ summary: 'Revoke Role from a User' })
    @ApiResponse({ status: 200, description: 'Role revoked from User successfully' })
    @ApiResponse({ status: 404, description: 'Role not found | User not found' })
    @Post(':id/role/revoke')
    async revokeRole(@Param('id') id: string,  @Body() role: GrantRevokeRoleDto) {
        return this.userService.revokeRole(id, role.role_id);
    }


}
