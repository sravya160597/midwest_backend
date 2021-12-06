import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingsDocument = Bookings & Document;

@Schema({ timestamps: true })
export class Bookings {
  @Prop({ required: true })
  userId: string;

  @Prop()
  cinemaId: string;

  @Prop()
  movieId: string;

  @Prop()
  seats: string;

  @Prop()
  paid: string;

  @Prop()
  timings: string;

  @Prop()
  format: string;

  @Prop()
  seatNos: string;

  @Prop({ default: 'ACTIVE' })
  status: string;
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
