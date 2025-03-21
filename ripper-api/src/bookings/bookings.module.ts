import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingRepository } from './booking.repository';
import { ProgramsModule } from '../programs/programs.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { Booking } from './booking.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ProgramsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
  exports: [BookingRepository],
})
export class BookingsModule {}
