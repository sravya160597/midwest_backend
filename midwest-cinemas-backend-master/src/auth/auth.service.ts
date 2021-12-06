import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const pass_check = await bcrypt.compare(password, user.password);

    if (user && pass_check) {
      const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      return result;
    }
    return null;
  }

  //1st called from auth controller
  async login(user: any, adminLogin = false) {
    // console.log({user})

    const userAccount = await this.usersService.findOneByEmail(user.email);
    const permissions: any = [];

    if (!userAccount) {
      throw new NotFoundException();
    }

    const userValid = await bcrypt.compare(user.password, userAccount.password);

    if (!userValid) {
      return JSON.stringify({
        success: false,
        message: 'Wrong Credentials!',
      });
    }

    if (adminLogin) {
      if (userAccount.role !== 'ADMIN') {
        return JSON.stringify({
          success: false,
          message: 'Wrong Credentials!',
        });
      }
    }

    const payload = {
      _id: userAccount._id,
      name: userAccount.name,
      email: userAccount.email,
      phone: userAccount.phone,
      role: userAccount.role,
    };
    const userData = payload;
    return {
      access_token: this.jwtService.sign(payload),
      permissions,
      userData,
    };
  }

  async register(data: any) {
    if (!data.name || !data.email || !data.password || !data.phone) {
      return { success: false, message: 'Please provide all details' };
    }

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      gender: data.gender,
    };

    const hashedPassword = await bcrypt.hash(data.password, 12);
    userData.password = hashedPassword;

    await this.usersService.create(userData);

    return {
      success: true,
      message: 'Account created successfully!',
    };
  }
}
