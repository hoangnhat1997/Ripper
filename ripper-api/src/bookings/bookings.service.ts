import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from '../users/user.entity';
import { ProgramRepository } from '../programs/program.repository';
import { Booking } from './booking.entity';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingRepository)
    private bookingRepository: BookingRepository,
    @InjectRepository(ProgramRepository)
    private programRepository: ProgramRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<void> {
    const { programId, startTime, endTime } = createBookingDto;

    const program = await this.programRepository.findOne({
      where: { id: programId },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID "${programId}" not found`);
    }

    if (new Date(startTime) <= new Date()) {
      throw new BadRequestException('Start time must be in the future');
    }

    if (new Date(endTime) <= new Date(startTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    const durationInMinutes =
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000;
    if (durationInMinutes < 5) {
      throw new BadRequestException('Duration must be at least 5 minutes');
    }

    const price =
      Math.ceil((durationInMinutes / 60) * program.hourlyRate * 100) / 100;

    if (user.wallet < price) {
      throw new BadRequestException(
        "You don't have sufficient funds to create this booking",
      );
    }

    const conflictingBookings = await this.bookingRepository.find({
      where: {
        trainee: user,
        startTime: LessThanOrEqual(new Date(endTime)),
        endTime: MoreThanOrEqual(new Date(startTime)),
      },
    });

    if (conflictingBookings.length > 0) {
      throw new ConflictException(
        'You already have a booking that conflicts with this one',
      );
    }

    await this.bookingRepository.createBooking(
      user,
      program,
      new Date(startTime),
      new Date(endTime),
      price,
    );

    user.wallet -= price;
    await user.save();
  }

  async cancelBooking(id: number, user: User): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }

    if (
      booking.trainee.id !== user.id &&
      booking.program.coach.id !== user.id
    ) {
      throw new UnauthorizedException(
        'You are not authorized to cancel this booking',
      );
    }

    booking.cancelled = true;
    await booking.save();

    if (booking.trainee.id === user.id) {
      user.wallet += booking.price;
      await user.save();
    }
  }

  async getUpcomingBookings(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        trainee: user,
        startTime: MoreThan(new Date()),
        cancelled: false,
      },
      order: {
        startTime: 'ASC',
      },
    });
  }

  async getBookingHistory(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        trainee: user,
        startTime: LessThan(new Date()),
        cancelled: false,
      },
      order: {
        startTime: 'DESC',
      },
    });
  }
}
