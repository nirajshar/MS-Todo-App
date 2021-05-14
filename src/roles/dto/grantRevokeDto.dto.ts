import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class GrantRevokeDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

}