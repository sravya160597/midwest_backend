import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movies, MoviesDocument } from './schema/movies.schema';
import { Cinemas, CinemasDocument } from '../cinemas/schema/cinemas.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name)
    private readonly moviesModel: Model<MoviesDocument>,
    @InjectModel(Cinemas.name)
    private readonly cinemasModel: Model<CinemasDocument>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const createdMovie = new this.moviesModel(createMovieDto);
    return createdMovie.save();
  }

  findAll() {
    return this.moviesModel.find({}).exec();
  }

  async findOne(id: string) {
    const result:any={}

    result.movie = await this.moviesModel.findById(id).exec();

    if (result.cinemas !== '') {
      result.cinemaDetails = await this.cinemasModel.findById(result.movie.cinemas).exec();
    }

    return result;
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.moviesModel.findByIdAndUpdate(id, updateMovieDto).exec();
  }

  remove(id: string) {
    return this.moviesModel.findByIdAndDelete(id).exec();
  }
}
