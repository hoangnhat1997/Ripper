import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from 'src/users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email } = signUpDto;
    const user = await this.userRepository.findOneUser(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    await this.userRepository.createUser(signUpDto);
  }
}
