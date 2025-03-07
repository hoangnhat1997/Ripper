import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingRepository } from './booking.repository';
import { ProgramsModule } from '../programs/programs.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRepository]),
    ProgramsModule,
    UsersModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
