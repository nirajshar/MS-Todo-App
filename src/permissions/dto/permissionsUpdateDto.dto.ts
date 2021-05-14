import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PermissionsUpdateDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
}