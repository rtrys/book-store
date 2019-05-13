import 'dotenv/config';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGOURL,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
