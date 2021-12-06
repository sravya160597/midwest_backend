import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { AuthService } from '../auth/auth.service';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { LocalStrategy } from '../auth/local.strategy';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, AuthService, LocalStrategy, JwtStrategy],
})
export class CategoriesModule { }
