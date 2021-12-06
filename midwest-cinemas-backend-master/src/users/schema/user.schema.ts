import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'USER' })
  role: string;

  gender: string;

  @Prop({ default: 'ACTIVE' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
