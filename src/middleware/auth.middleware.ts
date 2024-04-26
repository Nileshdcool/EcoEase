import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class authMiddleware implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    if (token === 'secretkey') {
      return true;
    } else {
      return false;
    }
  }
}
