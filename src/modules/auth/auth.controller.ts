import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/user.entity';
import { ReadUserDto } from '../user/dto/read-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService,
    ) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() signupDto: SignupDto): Promise<ReadUserDto> {
        return this._authService.signup(signupDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signin(@Body() signinDto: SigninDto) {
        return this._authService.signin(signinDto);
    }
}
