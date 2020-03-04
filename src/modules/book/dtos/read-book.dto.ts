import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { ReadUserDto } from '../../user/dto/read-user.dto';

@Exclude()
export class ReadBookDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;

    @Expose()
    @Type(type => ReadUserDto)
    readonly authors: ReadUserDto[];

}