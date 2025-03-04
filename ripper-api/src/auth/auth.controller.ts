import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto, @Res() res): Promise<void> {
    await this.authService.signUp(signUpDto);
    res.status(HttpStatus.CREATED).send();
  }
}
