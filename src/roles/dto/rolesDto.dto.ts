import { IsNotEmpty } from "class-validator";


export class RolesDto {

    @IsNotEmpty()
    id?: string;
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    createdAt?: Date;

   
}