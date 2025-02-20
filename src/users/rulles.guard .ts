import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Payload } from '../auth/entities/Payload';

@Injectable()
export class RullesGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: Payload }>();

    const rullesUser = request.user.rulles;

    if (!rullesUser?.includes('write:users'))
      throw new UnauthorizedException(
        'Usuário não autorizado verifique se tem a regra "write:users"',
      );

    return true;
  }
}
