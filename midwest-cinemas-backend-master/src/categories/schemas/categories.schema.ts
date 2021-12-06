import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as OBJ } from 'mongoose';

export type categoriesDocument = Categories & Document;

@Schema({ timestamps: true })
export class Categories {
  @Prop({ required: true })
  categoryName: string;

  @Prop()
  categoryCode: string;

  @Prop()
  description: string;

  @Prop()
  parent: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  level: number;

  @Prop()
  createdBy: OBJ.Types.ObjectId;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
