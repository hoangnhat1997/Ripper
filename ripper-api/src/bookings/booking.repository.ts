import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from '../users/user.entity';
import { Program } from '../programs/program.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  async createBooking(
    trainee: User,
    program: Program,
    startTime: Date,
    endTime: Date,
    price: number,
  ): Promise<Booking> {
    const booking = new Booking();
    booking.trainee = trainee;
    booking.program = program;
    booking.startTime = startTime;
    booking.endTime = endTime;
    booking.price = price;

    await booking.save();
    return booking;
  }
}
