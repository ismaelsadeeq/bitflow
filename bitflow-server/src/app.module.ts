import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { ResponseHandlerModule } from './response-handler/response-handler.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_STRING || ''),
    UserModule,
    ResponseHandlerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
