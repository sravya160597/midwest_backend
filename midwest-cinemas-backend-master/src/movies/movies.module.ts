import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from './schema/movies.schema';
import { Cinemas, CinemasSchema } from '../cinemas/schema/cinemas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
    MongooseModule.forFeature([{ name: Cinemas.name, schema: CinemasSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
