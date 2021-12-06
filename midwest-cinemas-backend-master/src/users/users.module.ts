import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/user.schema';
// import { PurchasesService } from '../purchases/purchases.service';
import { AuthService } from '../auth/auth.service';

import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { LocalStrategy } from '../auth/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            console.log('pre save');
          });
          return schema;
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
