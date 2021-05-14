import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class RolesUpdateDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

}