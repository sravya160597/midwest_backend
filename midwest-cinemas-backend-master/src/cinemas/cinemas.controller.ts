import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Post()
  async create(@Body() createCinemaDto: any) {
    console.log(createCinemaDto)
    return await this.cinemasService.create(createCinemaDto);
  }

  @Get()
  findAll() {
    return this.cinemasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: any) {
    return this.cinemasService.update(id, updateCinemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(id);
  }
}
