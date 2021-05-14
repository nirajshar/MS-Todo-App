import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsCreateDto } from './dto/permissionsCreateDto.dto';
import { PermissionsUpdateDto } from './dto/permissionsUpdateDto.dto';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {

    constructor(
        private readonly permissionsService: PermissionsService
    ) { }

    // Get all Permission
    @ApiResponse({ status: 200, description: 'Get all Permissions in Array of Object'})
    @Get()
    async findAll() {
        return this.permissionsService.findAll();
    }


    // Get Permission by ID
    @ApiResponse({ status: 200, description: 'Get Permissions details by ID'})
    @ApiResponse({ status: 404, description: 'Role not found'})
    @Get(':id')
    async findOne(@Param('id') id: string) {        
        return this.permissionsService.findOne(id);
    }


    // Create One Permission 
    @ApiResponse({ status: 201, description: 'Permission created successfully'})
    @ApiResponse({ status: 409, description: 'Permission already exist'})
    @Post()
    async create(@Body() permissionsCreateDto: PermissionsCreateDto) {
        return this.permissionsService.create(permissionsCreateDto);
    }


    // Update Permission by ID
    @ApiResponse({ status: 204, description: 'Permission updated successfully'})
    @ApiResponse({ status: 404, description: 'Permission not found'})
    @Put(':id')
    async update(@Param('id') id: string, @Body() permissionsUpdateDto: PermissionsUpdateDto) {
        return this.permissionsService.update(id, permissionsUpdateDto);
    }


    // Delete One Permission by ID
    @ApiResponse({ status: 200, description: 'Permissions deleted successfully'})
    @ApiResponse({ status: 404, description: 'Permissions not found'})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.permissionsService.delete(id);
    }


}
