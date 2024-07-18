import { IsEmail, IsNotEmpty, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// List of common passwords.
const commonPasswords = [
    'password', '1234567890', 'abc1234567', 'password1', '111111111', '0000000000', 'welcome', 'mypassword123'
  ];

// Custom password validator
@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
        // Regex for a password that is at least 10 characters long,
        // contains at least one uppercase letter, one lowercase letter,
        // one digit, and one special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

        // Check if the password matches the regex
        const isValidFormat = passwordRegex.test(password);

        // Check if the password is not in the list of common passwords
        const isNotCommonPassword = !commonPasswords.includes(password);

        return isValidFormat && isNotCommonPassword; // Return true if both conditions are met
    }

    defaultMessage(args: ValidationArguments) {
        // Error message to be shown if validation fails
        return 'Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
}

// RegisterDto class
export class RegisterDto {

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Validate(CustomPasswordValidator)
    password: string;

    @IsNotEmpty()
    password_confirmed: string;
}