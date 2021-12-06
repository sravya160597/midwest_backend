import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CinemasDocument = Cinemas & Document;

@Schema({ timestamps: true })
export class Cinemas {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  formats: string;

  @Prop()
  seatCapacity: string;

  @Prop()
  tags: string;

  @Prop()
  timings: string;

  @Prop()
  price: string;

  @Prop({ default: 'ACTIVE' })
  status: string;
}

export const CinemasSchema = SchemaFactory.createForClass(Cinemas);
