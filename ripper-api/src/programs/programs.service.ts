import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramRepository } from './program.repository';
import { CreateProgramDto } from './dto/create-program.dto';
import { User } from '../users/user.entity';
import { Program } from './program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramRepository)
    private programRepository: ProgramRepository,
  ) {}

  async createProgram(
    createProgramDto: CreateProgramDto,
    user: User,
  ): Promise<void> {
    const { sport, hourlyRate, description } = createProgramDto;

    await this.programRepository.createProgram(
      sport,
      hourlyRate,
      description ?? '',
      user,
    );
  }

  async getPrograms(): Promise<Program[]> {
    return this.programRepository.find({ where: { deleted: false } });
  }

  async getProgramById(id: number): Promise<Program> {
    const program = await this.programRepository.findOne({ where: { id } });

    if (!program) {
      throw new NotFoundException(`Program with ID "${id}" not found`);
    }

    return program;
  }

  async updateProgram(
    id: number,
    updateProgramDto: CreateProgramDto,
    user: User,
  ): Promise<void> {
    const { hourlyRate, description } = updateProgramDto;
    const program = await this.getProgramById(id);

    if (program.coach.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this program',
      );
    }

    program.hourlyRate = hourlyRate;
    program.description = description ?? program.description;

    await program.save();
  }

  async deleteProgram(id: number, user: User): Promise<void> {
    const program = await this.getProgramById(id);

    if (program.coach.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this program',
      );
    }

    program.deleted = true;
    await program.save();
  }
}
