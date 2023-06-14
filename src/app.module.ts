import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'backend-pruebaDB'}),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
