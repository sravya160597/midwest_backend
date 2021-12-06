import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcryptjs from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
    // return 'This action adds a new organisation';
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({ role: 'USER' })
      .exec();
  }

  async findVendor(): Promise<User[]> {
    return await this.userModel.find({ role: { $in: ['VENDOR'] } }).exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findOneByEmail(id: string) {
    return await this.userModel.findOne({ email: id }).exec();
  }

  async findOneByPhone(phone: number) {
    return await this.userModel.findOne({ phone: phone }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto?.password) {
      const hashedPassword = await bcryptjs.hash(updateUserDto?.password, 12);
      updateUserDto.password = hashedPassword;
    }
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updatePassword(id: string, forgotPasswordDto: ForgotPasswordDto) {
    if (forgotPasswordDto?.oldPassword) {
      const databasePassword = await this.userModel.findById(id).exec();
      const isMatch = await bcryptjs.compare(
        forgotPasswordDto.oldPassword,
        databasePassword.password,
      );

      if (isMatch) {
        const hashedPassword = await bcryptjs.hash(
          forgotPasswordDto?.newPassword,
          12,
        );
        forgotPasswordDto.newPassword = hashedPassword;
        return await this.userModel
          .findByIdAndUpdate(
            { _id: id },
            { password: forgotPasswordDto.newPassword },
          )
          .exec();
      } else {
        throw new BadRequestException();
      }
    }

    throw new NotFoundException();
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
