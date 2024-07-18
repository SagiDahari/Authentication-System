import { IsIdentityCard, IsNotEmpty, IsString } from "class-validator";


// Customer DTO
export class CustomerDto {

    @IsNotEmpty()
    idNumber: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

}

    
