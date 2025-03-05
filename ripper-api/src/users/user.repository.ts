import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;

    const user = this.userRepository.create({ name, email, password });
    await this.userRepository.save(user);
  }

  async findOneUser(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    }
    return null;
  }
}
