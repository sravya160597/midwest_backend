import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

import { LoginDTO } from './dto/login-dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const userAccountCheck = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    const userAccountCheck2 = await this.usersService.findOneByPhone(
      createUserDto.phone,
    );

    if (userAccountCheck || userAccountCheck2) {
      return JSON.stringify({
        success: false,
        message: userAccountCheck
          ? 'Email already exists!'
          : 'Phone no.  already exists!',
      });
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

    await this.usersService.create(createUserDto);

    return JSON.stringify({
      success: true,
    });
  }

  @Post('/login')
  async loginUser(@Body() userData: LoginDTO) {
    return this.authService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/vendor')
  async findVendor(): Promise<User[]> {
    return await this.usersService.findVendor();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/forgot-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return await this.usersService.updatePassword(id, forgotPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
