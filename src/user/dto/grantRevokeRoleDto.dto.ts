import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class GrantRevokeRoleDto {

    @ApiProperty()
    @IsNotEmpty()
    role_id: string;    

}