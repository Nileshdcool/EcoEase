import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AUTH_REQUEST_HEADER, BEARER } from '../constants/auth.constants';

@Injectable()
export class authMiddleware implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers[AUTH_REQUEST_HEADER];

    if (!authHeader) {
      return false;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== BEARER || !token) {
      return false;
    }

    if (token === process.env.AUTH_KEY) {
      return true;
    } else {
      return false;
    }
  }
}
