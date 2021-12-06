import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings, BookingsDocument } from './schema/bookings.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Bookings.name)
    private readonly bookingsModel: Model<BookingsDocument>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    const createdBooking = new this.bookingsModel(createBookingDto);
    return createdBooking.save();
  }

  findAll(user) {
    if (user.role === 'ADMIN') {
      return this.bookingsModel.find({}).exec();
    }
    return this.bookingsModel.find({ userId: user._id }).exec();
  }

  findOne(id: string) {
    return this.bookingsModel.findById(id).exec();
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingsModel.findByIdAndUpdate(id, updateBookingDto).exec();
  }

  remove(id: string) {
    return this.bookingsModel.findByIdAndDelete(id).exec();
  }
}
