import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({status: 200, description: 'Server Active'})
  @ApiResponse({status: 500, description: 'Server Inactive'})
  @Get()
  index() {
    return this.appService.index();
  }
}
