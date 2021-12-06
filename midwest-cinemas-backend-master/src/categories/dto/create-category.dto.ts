import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {  Schema as OBJ } from 'mongoose';

export class CreateCategoryDto {

    @IsNotEmpty()
    categoryName : string;
     
    @IsOptional()
    @IsString()
    categoryCode : string;
     
    @IsOptional()
    @IsString()
    description : string;

    // @IsString()
    parent : string;

    level : number;    
  
    @IsString()
    status : string;
     
    
    createdBy : OBJ.Types.ObjectId;
}
