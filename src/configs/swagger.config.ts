import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIGS } from '../constants/swagger.constants';

export function configureSwagger(app: any, options: any): void {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, SWAGGER_CONFIGS);
}
