import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ where: { email } });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }
}
