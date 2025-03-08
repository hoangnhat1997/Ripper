import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Program } from './program.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProgramRepository extends Repository<Program> {
  constructor(private dataSource: DataSource) {
    super(Program, dataSource.createEntityManager());
  }

  async createProgram(
    sport: string,
    hourlyRate: number,
    description: string,
    coach: User,
  ): Promise<Program> {
    const program = new Program();
    program.sport = sport;
    program.hourlyRate = hourlyRate;
    program.description = description;
    program.coach = coach;

    await program.save();
    return program;
  }
}
