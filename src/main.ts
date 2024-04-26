import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

var admin = require('firebase-admin');

var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('EcoEase Street Cleaning API')
    .setDescription(
      `This API provides endpoints to manage tasks 
      for inner-city street cleaning, leveraging innovative 
      solutions to tackle urban trash accumulation. 
      Partnered with a food delivery company, EcoEase utilizes 
      camera-equipped delivery riders to identify areas with high 
      garbage concentration, allowing efficient assignment of cleaning tasks. 
      This API facilitates task creation, display, and editing, empowering 
      workers to contribute to cleaner and healthier urban environments.`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
