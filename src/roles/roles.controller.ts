import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrantRevokeDto } from './dto/grantRevokeDto.dto';
import { RolesCreateDto } from './dto/rolesCreate.dto';
import { RolesUpdateDto } from './dto/rolesUpdate.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(
        private readonly roleService: RolesService
    ) { }

    // Get all Roles
    @ApiResponse({ status: 200, description: 'Get all Roles in Array of Object' })
    @Get()
    async findAll() {
        return this.roleService.findAll();
    }

    // Get Role by ID
    @ApiResponse({ status: 200, description: 'Get Role details by ID' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }

    // Create One Role 
    @ApiResponse({ status: 201, description: 'Role created successfully' })
    @ApiResponse({ status: 409, description: 'Role already exist' })
    @Post()
    async create(@Body() rolesCreateDto: RolesCreateDto) {
        return this.roleService.create(rolesCreateDto);
    }


    // Update Role by ID
    @ApiResponse({ status: 204, description: 'Role updated successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() rolesUpdateDto: RolesUpdateDto) {
        return this.roleService.update(id, rolesUpdateDto);
    }

    // Delete One Role by ID
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.roleService.delete(id);
    }

    // ## ACL
    // Grant permission to Role
    @ApiOperation({ summary: 'Grant Permissions to Role' })  
    @ApiBody({ type:[GrantRevokeDto]})  
    @ApiResponse({ status: 201, description: 'Permissions granted to Role successfully'})
    @ApiResponse({ status: 404, description: 'Role not found' })
    @Post(':id/grant')
    async grantPermissionsToRole(@Param('id') id: string, @Body() permissions: GrantRevokeDto[]) {
        return this.roleService.grantPermissionsToRole(id, permissions);
    }

    // Revoke permission from Role
    @ApiOperation({ summary: 'Revoke Permissions from Role' })  
    @ApiBody({ type:[GrantRevokeDto]})  
    @ApiResponse({ status: 200, description: 'Permissions revoked from Role successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @Post(':id/revoke')
    async revokePermissionsFromRole(@Param('id') id: string, @Body() permissions: GrantRevokeDto[]) {
        return this.roleService.revokePermissionsFromRole(id, permissions);
    }
}
