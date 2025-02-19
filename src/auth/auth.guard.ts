import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './entities/Payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Usuário não autorizado');

    try {
      const payload = await this.jwtService.verifyAsync<Payload>(token, {
        secret: process.env.secret,
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Usuário não autorizado', {
        cause: error,
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
