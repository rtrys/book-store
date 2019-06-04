import 'dotenv/config';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './authors/authors.module';

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
    AuthorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
