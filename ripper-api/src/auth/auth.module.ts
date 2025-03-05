import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserRepository],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
