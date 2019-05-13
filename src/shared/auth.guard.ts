import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const req = context.switchToHttp().getRequest();
    this.validateReques(req);
    return true;
  }

  validateReques(req: any) {
    const { authorization } = req.headers;
    req.user = this.validateToken(authorization);
  }

  validateToken(auth: string) {
    if (!auth || auth.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }

    const token = auth.split(' ')[1];
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new UnauthorizedException(message);
    }
  }
}
