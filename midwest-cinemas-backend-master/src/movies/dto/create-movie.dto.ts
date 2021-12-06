import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  name: string;

  description: string;
  image: string;
  language: string;
  genres: string;
  cast: string;
  format: string;
  isShowing: boolean;
  tags: string;
  duration: string;
  ratings: string;
  synopsis: string;
  trailer: string;
  cinemas: string;
  availableSeats: number;
}
