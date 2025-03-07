import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.bookingsService.createBooking(createBookingDto, user);
  }

  @Patch('/:id/cancel')
  @UseGuards(AuthGuard())
  cancelBooking(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.bookingsService.cancelBooking(id, user);
  }

  @Get('/upcoming')
  @UseGuards(AuthGuard())
  getUpcomingBookings(@GetUser() user: User): Promise<Booking[]> {
    return this.bookingsService.getUpcomingBookings(user);
  }

  @Get('/history')
  @UseGuards(AuthGuard())
  getBookingHistory(@GetUser() user: User): Promise<Booking[]> {
    return this.bookingsService.getBookingHistory(user);
  }
}
