  
import { IsNotEmpty, IsEmail } from 'class-validator';
import { RolesEntity } from 'src/roles/entity/roles.entity';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdOn?: Date;

  role?: RolesEntity;
  
  role_id?: string;
}