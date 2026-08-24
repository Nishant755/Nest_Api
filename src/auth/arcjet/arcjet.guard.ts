import { Injectable, Inject, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ARCJET_CLIENT } from './arcjet';
import { SKIP_ARCJET } from './skip-arcjet.decorator';

@Injectable()
export class ArcjetGuard implements CanActivate {
  constructor(
    @Inject(ARCJET_CLIENT) private arcjet: any,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_ARCJET, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const decision = await this.arcjet.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new ForbiddenException('Too many requests');
      }

      throw new ForbiddenException('Request blocked');
    }

    return true;
  }
}