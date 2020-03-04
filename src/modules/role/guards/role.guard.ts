import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Reflector nos ayuda a decifrar los valores de la inyección de dependencias en tiempo de ejecución
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly _reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {

    // Se obtienen los roles pasados por el decorador, cuyos valores ya están en el contexto
    // se obtienen los valores a traves de key value en este case del key 'roles' desde el decorator
    const roles: string[] = this._reflector.get<string[]>('roles', context.getHandler());

    // si no hay roles retornamos un true para no detener el flujo de datos de nestjs
    if (!roles) {
      return true;
    }

    // Si hay roles debemos hacer dos cosas: 

    // 1. Intersectar el reuqest que se está ejecutando en este momento, 
    // esto para obtener el usuario que esta en este momento
    const request = context.switchToHttp().getRequest();

    // esta forma " const { user } = request;" nos permite estructurar una respuesta
    const { user } = request;

    // 2. Preguntamos si ese user tiene uno de los roles que vienen por el decorador
    const hasRole = () => user.roles.some((role: string) => roles.includes(role));

    // finalmente retornamos un boolean comprobando que exsita el usuario, que existan roles y 
    // que el user tenga los roles
    return user && user.roles && hasRole();

  }
}
