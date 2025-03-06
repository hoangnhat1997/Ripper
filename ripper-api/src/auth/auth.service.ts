import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<void> {
    if (!signUpDto.email) {
      throw new Error('Email is required');
    }
    const user = await this.userService.findOneUser(signUpDto.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    await this.userService.createUser(signUpDto);
  }

  async signIn(signInDto: any): Promise<string> {
    const { email, password } = signInDto;

    const user = await this.userService.findOneUser(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }
}
