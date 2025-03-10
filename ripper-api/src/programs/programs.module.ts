import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { ProgramRepository } from './program.repository';
import { PassportModule } from '@nestjs/passport';
import { Program } from './program.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramRepository],
  exports: [TypeOrmModule, ProgramRepository],
})
export class ProgramsModule {}
