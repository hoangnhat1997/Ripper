import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { ProgramRepository } from './program.repository';
import { PassportModule } from '@nestjs/passport';
import { Program } from './program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramRepository],
  exports: [TypeOrmModule, ProgramRepository],
})
export class ProgramsModule {}
