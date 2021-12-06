import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoviesDocument = Movies & Document;

@Schema({ timestamps: true })
export class Movies {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  language: string;

  @Prop()
  genres: string;

  @Prop()
  cast: string;

  @Prop()
  format: string;

  @Prop()
  isShowing: boolean;

  @Prop()
  tags: string;

  @Prop()
  duration: string;

  @Prop()
  ratings: string;

  @Prop()
  trailer: string;

  @Prop()
  synopsis: string;

  @Prop()
  cinemas: string;

  @Prop()
  availableSeats: number;

  @Prop({ default: 'ACTIVE' })
  status: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
