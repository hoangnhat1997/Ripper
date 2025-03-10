import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { Program } from './program.entity';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createProgram(
    @Body() createProgramDto: CreateProgramDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.programsService.createProgram(createProgramDto, user);
  }

  @Get()
  getPrograms(): Promise<Program[]> {
    return this.programsService.getPrograms();
  }

  @Get('/:id')
  getProgram(@Param('id') id: number): Promise<Program> {
    return this.programsService.getProgramById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateProgram(
    @Param('id') id: number,
    @Body() updateProgramDto: CreateProgramDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.programsService.updateProgram(id, updateProgramDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProgram(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.programsService.deleteProgram(id, user);
  }
}
