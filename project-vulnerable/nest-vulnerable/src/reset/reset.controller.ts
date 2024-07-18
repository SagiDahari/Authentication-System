import { BadRequestException, Body, Controller, Inject, NotFoundException, Post, forwardRef } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
import { ResetDto } from 'src/auth/dto/reset.dto'
import * as bcrypt from 'bcrypt';
import { PasswordHistoryService } from 'src/password_history/password_history.service';
const crypto = require('crypto');

@Controller()
export class ResetController {
    
    constructor( 
        private resetService: ResetService,
        private mailerService: MailerService,
        @Inject( forwardRef( () => AuthService))
        private authService: AuthService,
        private passwordHistoryService: PasswordHistoryService
    ) {

    }

    @Post('forgot')
    async forgot(@Body('email') email:string) {

        // Checking if the email is linked to a user in the database.
        const user = await this.authService.findOneBy({ email: email });
        
        if (!user) {
            throw new BadRequestException('Email does not exist in the DB!');
        }
        else {
        // Generate a random token
        const token = crypto.randomBytes(6).toString('hex');

        // Hash the random string using SHA-1
        const sha1Hash = crypto.createHash('sha1').update(token).digest('hex');
        

        // Generate a random code
        const code = crypto.randomBytes(6).toString('hex');

        // Hash the code
        const codeHashed = crypto.createHash('sha1').update(code).digest('hex');

        await this.resetService.create({email,token: sha1Hash,code: codeHashed});

        const url = `http://localhost:4200/reset-code/${sha1Hash}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "reset your password",
            html: `Click <a href="${url}">here</a> to reset your password, 
            This is your code: ${codeHashed}` 
        })

    return {
        message: "An email for resetting your password has been sent to you."
    };
        } 
    }

    @Post("reset-code")
    async resetCode(@Body('code') code: string) {
        const reset = await this.resetService.findOne({code: code})
        if (!reset) {
            throw new NotFoundException("Wrong code");
        }
        else { 
            return {
                message: "success"
            }
        }
    }

    @Post("reset")
    async reset(@Body() body: ResetDto) {
        if (body.password !== body.password_confirmed) {
            throw new BadRequestException("Passwords do not match!");
        }

        // Finding the user's email by the token in the reset DB
        const reset = await this.resetService.findOne({token: body.token});
        
        const email = reset.email;

        // Searching for the user's email in the users DB
        const user = await this.authService.findOneBy({email: email});

        if (!user) {
            throw new NotFoundException("This email is not linked to a registered user!")
        }

        // encrypting the new password.
        const saltOrRounds = 12;
        const hashedPassword = await bcrypt.hash(body.password,saltOrRounds);

        // Updating the new password in the password_history table using the passwordHistoryService method.
        await this.passwordHistoryService.updatePasswordHistory(user,hashedPassword,body.password);
        // Updating the new password in the users table using the authService update method.
        await this.authService.update(user.id, {password: hashedPassword});
        
        

        return {
            message: "Password has been changed successfully"
        }
    }
}