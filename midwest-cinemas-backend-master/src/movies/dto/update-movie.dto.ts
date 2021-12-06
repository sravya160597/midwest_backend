import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  name: string;

  description: string;
  image: string;
  language: string;
  genres: string;
  format: string;
  cast: string;
  isShowing: boolean;
  tags: string;
  duration: string;
  ratings: string;
  synopsis: string;
  trailer: string;
  cinemas: string;
  availableSeats: number;
}
