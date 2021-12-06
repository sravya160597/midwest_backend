import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinemas, CinemasDocument } from './schema/cinemas.schema';

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinemas.name)
    private readonly cinemasModel: Model<CinemasDocument>,
  ) {}

  async create(createCinemaDto: CreateCinemaDto): Promise<Cinemas> {
    const createdCinema = new this.cinemasModel(createCinemaDto);
    return await createdCinema.save();
  }

  findAll() {
    return this.cinemasModel.find({}).exec();
  }

  findOne(id: string) {
    return this.cinemasModel.findById(id).exec();
  }

  update(id: string, updateCinemaDto: UpdateCinemaDto) {
    return this.cinemasModel.findByIdAndUpdate(id, updateCinemaDto).exec();
  }

  remove(id: string) {
    return this.cinemasModel.findByIdAndDelete(id).exec();
  }
}
