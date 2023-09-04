import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
dotenv.config();
const url=process.env.MONGO_URI
@Module({
  imports: [UserModule,MongooseModule.forRoot(url)],
  controllers: [],
  providers: [],
})
export class AppModule {}
