import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  helmet from 'helmet';
import { Logger } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import * as fs from 'fs'

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secret/key.pem'),
  //   cert: fs.readFileSync('./secret/certificate.pem'),
  // }
  const app = await NestFactory.create(AppModule,{
    // httpsOptions
    }
  );

  //using helmet to protect against some known vulnerabilities
  app.use(helmet())

  const options = {
    origin:'*', //[arr of origins]
    credentails:true
  }

  //enabling cors
  app.enableCors(options)

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
