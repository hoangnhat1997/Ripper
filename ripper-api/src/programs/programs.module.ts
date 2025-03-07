import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { ProgramRepository } from './program.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramRepository])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
