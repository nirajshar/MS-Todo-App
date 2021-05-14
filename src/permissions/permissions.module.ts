import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './entity/permissions.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsEntity])
  ],
  providers: [PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule { }
