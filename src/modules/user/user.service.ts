import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async get(userId: number): Promise<ReadUserDto> {

        if (!userId) {
            throw new BadRequestException('El id no fue enviado');
        }

        const user: User = await this._userRepository
            .findOne(userId, { where: { status: status.ACTIVE } });

        if (!user) {
            throw new NotFoundException('El Usuario no existe');
        }

        return plainToClass(ReadUserDto, user);

    }

    async getAll(): Promise<ReadUserDto[]> {

        const users: User[] = await this._userRepository
            .find({ where: { status: status.ACTIVE } });

        return users.map((user: User) => plainToClass(ReadUserDto, user));

    }

    // async create(user: User): Promise<User> {

    //     // TODO: details 
    //     const details = new UserDetails();
    //     user.details = details;

    //     // TODO: role
    //     const repo = await getConnection().getRepository(Role);
    //     const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });

    //     user.roles = [defaultRole];

    //     const savedUser = await this._userRepository.save(user);
    //     return savedUser;
    // }

    async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {

        const foundUser = await this._userRepository.findOne(userId, {
            where: { status: status.ACTIVE },
        });

        if (!foundUser) {
            throw new NotFoundException('El usuario no existe o está inactivo');
        }

        foundUser.username = user.username;

        const userUpdated = await this._userRepository.save(foundUser);

        return plainToClass(ReadUserDto, userUpdated);

    }

    async delete(userId: number): Promise<boolean> {
        const userExist = await this._userRepository
            .findOne(userId, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException('El usuario que intenta eliminar no existe no existe');
        }

        await this._userRepository.update(userId, { status: status.INACTIVE });

        return true;

    }

    async setRolToUser(userId: number, roleId: number): Promise<boolean> {

        const userExist = await this._userRepository
            .findOne(userId, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException('El usuario no existe');
        }

        const roleExist = await this._roleRepository
            .findOne(roleId, { where: { status: status.ACTIVE } });

        if (!roleExist) {
            throw new NotFoundException('El rol no existe');
        }

        userExist.roles.push(roleExist);
        await this._userRepository.save(userExist);

        return true;

    }

}
