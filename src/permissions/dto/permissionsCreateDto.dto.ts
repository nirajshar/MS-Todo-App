import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PermissionsCreateDto {
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}