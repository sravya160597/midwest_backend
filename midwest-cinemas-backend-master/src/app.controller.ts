import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth-guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) { }

  @Get('/')
  landing(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/admin/login')
  async adminLogin(@Request() req) {
    return this.authService.login(req.body, true);
  }

  @Post('/auth/forgot-password')
  async forgotPassword(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
}
