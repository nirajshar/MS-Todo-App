import { IsNotEmpty } from "class-validator";

export class PermissionsDto {
    
    @IsNotEmpty()
    id?: string;
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    createdAt?: Date;

}