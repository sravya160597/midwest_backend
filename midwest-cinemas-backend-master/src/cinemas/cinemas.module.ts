import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinemas, CinemasSchema } from './schema/cinemas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cinemas.name, schema: CinemasSchema }]),
  ],
  controllers: [CinemasController],
  providers: [CinemasService],
})
export class CinemasModule {}
