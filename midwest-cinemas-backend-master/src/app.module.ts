import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { MoviesModule } from './movies/movies.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017/midwestcinema'),
    MongooseModule.forRoot('mongodb+srv://midwestcinema:midwestcinema@cluster0.jksvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MulterModule.register({ dest: './uploads' }),
    // ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '..', 'uplodads'),
    // }),
    UsersModule,
    AuthModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    CinemasModule,
    MoviesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
