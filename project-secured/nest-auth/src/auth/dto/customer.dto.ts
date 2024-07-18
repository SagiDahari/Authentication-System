import { IsNotEmpty, IsString } from "class-validator";


// Customer DTO
export class CustomerDto {

    @IsNotEmpty()
    idNumber: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

}

    
