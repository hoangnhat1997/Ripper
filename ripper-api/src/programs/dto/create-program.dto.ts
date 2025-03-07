import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsNumber()
  @Min(1)
  hourlyRate: number;

  @IsString()
  description?: string;
}
