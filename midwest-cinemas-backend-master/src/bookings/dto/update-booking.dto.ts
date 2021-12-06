import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    userId: string;
    cinemaId: string;
    movieId: string;
    seats: string;
    paid: string;
    timings: string;
    format: string;
    seatNos: string;
    status: string;
}
