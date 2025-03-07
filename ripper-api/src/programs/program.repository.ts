import { Repository, EntityRepository } from 'typeorm';
import { Program } from './program.entity';
import { User } from '../users/user.entity';

@EntityRepository(Program)
export class ProgramRepository extends Repository<Program> {
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
