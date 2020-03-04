import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailsDto } from './read-user-details.dto';

@Exclude()
export class ReadUserDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsString()
    readonly username: string;

    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto;

}