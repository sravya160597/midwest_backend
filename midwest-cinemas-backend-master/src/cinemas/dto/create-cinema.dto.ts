import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  @IsString()
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
