/**
 * La regla de un decorator ue debe tener un decorator es solo la utilizacion del 
 * metodo SetMetadata de @nestjs/common
 */
import { SetMetadata } from '@nestjs/common';

/**
 * Exportamos una constante cuyo mombre será el nombre con el que llamemos el decorador
 * esta constante va a recibir los roles que pasaremos para realizar el filtrado
 * se le indica un key value al método SetMetadata
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);