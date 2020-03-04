import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {

    @IsString()
    @MaxLength(50, { message: 'El nombre indicado no es válido' })
    readonly name: string;

    @IsString()
    @MaxLength(50, { message: 'La descripción indicada no es válida' })
    readonly description: string;
}