import { IsNotEmpty, Validate } from "class-validator";
import { CustomPasswordValidator } from "./register.dto";

// Reset DTO
export class ResetDto {

    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    @Validate(CustomPasswordValidator)
    password: string;

    @IsNotEmpty()
    password_confirmed: string;

}