import { PartialType } from '@nestjs/swagger';
import { CreateCinemaDto } from './create-cinema.dto';

export class UpdateCinemaDto extends PartialType(CreateCinemaDto) {
  name: string;
  address: string;
  location: string;
  formats: string;
  seatCapacity: string;
  tags: string;
  timings: string;
  price: string;
  status: string;
}
