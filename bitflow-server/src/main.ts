import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  helmet from 'helmet';
import * as csurf from 'csurf';
import { Logger } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //using helmet to protect against some known vulnerabilities
  app.use(helmet)

  const options = {
    origin:'*', //[arr of origins]
    credentails:true
  }

  //enabling cors
  app.enableCors(options)

  //Server side request forgery protector
  app.use(csurf)

  app.use(
    rateLimit({
      windowMs:20 * 60 * 1000,
      max:200,
      standardHeaders:true,
      legacyHeaders:false
    })
  )
  await app.listen(process.env.PORT || 3000);
  Logger.log("Application started at port "+process.env.PORT || 3000)
}
try {
  bootstrap();
} catch (error) {
  console.log(error)
}
