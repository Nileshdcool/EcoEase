import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middleware/error.middleware';
import { SWAGGER_DOC_TITLE, SEAGGER_DOC_DESCIPTION } from './constants/swagger.constants';
import { DocumentBuilder } from '@nestjs/swagger';
import { initializeFirebase } from './configs/firebase-admin.init';
import { initializeSentry } from './configs/sentry.init';
import { configureSwagger } from './configs/swagger.config';

async function bootstrap() {
   
  initializeFirebase(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
  
  const app = await NestFactory.create(AppModule);
  
  initializeSentry(process.env.SENTRY_DSN);

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_DOC_TITLE)
    .setDescription(SEAGGER_DOC_DESCIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  configureSwagger(app, options);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
