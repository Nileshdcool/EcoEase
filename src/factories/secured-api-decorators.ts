import { authMiddleware } from '../middleware/auth.middleware';
import {
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

export function AuthenticatedApiOperation(
  summary: string,
  responseDescription: string,
  query?: { name: string; description: string, type:string }[],
  params?: { name: string; description: string }[],
  body?: any,
  additionalDecorators: any[] = [],
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    UseGuards(authMiddleware)(target, propertyKey, descriptor);
    ApiBearerAuth()(target, propertyKey, descriptor);
    ApiOperation({ summary })(target, propertyKey, descriptor);
    ApiResponse({ status: HttpStatus.OK, description: responseDescription })(
      target,
      propertyKey,
      descriptor,
    );
    additionalDecorators.forEach(decorator => decorator(target, propertyKey, descriptor));
    if (query) query.forEach(q => ApiQuery({ name: q.name, description: q.description })(target, propertyKey, descriptor));
    if (params) params.forEach(p => ApiParam({ name: p.name, description: p.description })(target, propertyKey, descriptor));
    if (body) ApiBody({ schema: body })(target, propertyKey, descriptor);
  };
}
