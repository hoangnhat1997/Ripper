import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  programId: number;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;
}
