import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    @MaxLength(50, { message: 'El nombre indicado no es válido' })
    readonly name: string;

    @Expose()
    @IsString()
    @MaxLength(50, { message: 'La descripción indicada no es válida' })
    readonly description: string;
}