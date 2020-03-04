import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

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

    @Expose()
    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto;

    @Expose()
    @Type(type => ReadRoleDto)
    readonly roles: ReadRoleDto;

}