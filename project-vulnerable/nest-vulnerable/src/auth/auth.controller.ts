import { BadRequestException, ForbiddenException, Body, Controller, Post, Res, Req, Get, UseInterceptors, ClassSerializerInterceptor, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express";
import { AuthInterceptor } from './auth.interceptor';



@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) {

    }

    // Registering a user 
    @Post("register")
    async register(@Body() body: RegisterDto){
        const user = await this.authService.findOneBy({ email: body.email });

        if (user) {
            throw new ConflictException('This Email is already registered, please try another one');
        }

        if (body.password !== body.password_confirmed) {
            throw new BadRequestException('Passwords do not match');
        }

        await this.authService.create(body);

        return {
            message: 'You have registered successfully!',
        };
    }


    // Logging in 
    @UseInterceptors(ClassSerializerInterceptor) // This interceptor is used to exclude the password from the JSON response
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request
    ) {
        // Check if the user is already logged in
        const existingCookie = request.cookies['jwt'];
        if (existingCookie) {
            try {
                const data = await this.jwtService.verifyAsync(existingCookie);
                console.log(data);
                if (data) {
                    throw new BadRequestException('The user is already logged in.');
                }
            } catch (e) {
                // If the token is invalid or expired, we allow the login process to continue
                if (!(e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError')) {
                    // Rethrow the error if it's anything other than an invalid/expired token
                    throw e;
                }
            }
        }

        const user = await this.authService.isValidAccount(email, password);
        if (!user) {
            throw new BadRequestException('Invalid credentials!');
        }

        if (user.isLocked) {
            throw new BadRequestException('Your account is locked due to multiple failed login attempts.');
        }
        // Cookie Generating
        const jwt = await this.jwtService.signAsync({ id: user.id });
        
        response.cookie('jwt', jwt, { httpOnly: true });
        return user;
    }
    
    // User Authentication method
    @UseInterceptors(ClassSerializerInterceptor, AuthInterceptor) 
    @Get('user')
    async user(@Req() request: Request) {

        // getting the current user's cookie.
        const cookie = request.cookies['jwt'];

        // getting the cookie's data : user's id, exp time, etc...
        const data = await this.jwtService.verifyAsync(cookie);
        // returning the user by it's id.
        return this.authService.findOneByID({id: data['id']})
    }

    // Log-Out
    @UseInterceptors(AuthInterceptor) // this interceptor is used to verify if the session cookie still exists.
    @Post('logout')
    async logout(
        @Res({passthrough: true}) response: Response // getting the cookie from the frontend.
    ) {
        // clearing the session cookie.
        response.clearCookie('jwt')

        return {
            message: 'Success'
        }
    }
}
