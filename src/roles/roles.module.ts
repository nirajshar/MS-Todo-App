import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entity/roles.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PermissionsEntity } from 'src/permissions/entity/permissions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesEntity, PermissionsEntity]),
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
