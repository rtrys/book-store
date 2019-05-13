import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = this.getToken(req);
    this.validateToken(auth);
    return true;
  }

  getToken(req: any) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException('Invalid token');
    }
    return authorization;
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
