import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories, categoriesDocument } from './schemas/categories.schema';
import { Model } from 'mongoose';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModel: Model<categoriesDocument>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {

    const checkCategorys = await this.categoriesModel.find().exec();
    let level;
    if (createCategoryDto.parent == '' || createCategoryDto.parent == undefined || createCategoryDto.parent === null) {
      level = 0
    }
    checkCategorys.map(categoryData => {

      if (categoryData.categoryName === createCategoryDto.categoryName) {
        throw new BadRequestException({
          message: "categoryName is  already existed"
        })

      }


      if (categoryData._id == createCategoryDto.parent) {
        level = categoryData.level + 1;

      }
    })
    const createdCategories = new this.categoriesModel({ ...createCategoryDto, level })
    return createdCategories.save();
  }

  findAll() {
    return this.categoriesModel.find().exec();
  }

  findOne(id: string) {
    return this.categoriesModel.findById(id).exec();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesModel.findByIdAndUpdate(id, updateCategoryDto).exec();
  }

  remove(id: string) {
    return this.categoriesModel.findByIdAndDelete(id).exec();
  }
}

