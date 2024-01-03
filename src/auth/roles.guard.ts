import { Role } from 'src/user/types/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
    console.log('Hello!');
  }

  async canActivate(context: ExecutionContext) {
    const authenticated = await super.canActivate(context);
    console.log(authenticated);
    if (!authenticated) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    return requiredRoles.some((role) => user.role === role);
  }
}
