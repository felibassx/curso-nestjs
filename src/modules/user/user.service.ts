import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async get(id: number): Promise<User> {

        if (!id) {
            throw new BadRequestException('El id no fue enviado');
        }

        const user: User = await this._userRepository
            .findOne(id, { where: { status: status.ACTIVE } });

        if (!user) {
            throw new NotFoundException('El Usuario no existe');
        }

        return user;

    }

    async getAll(): Promise<User[]> {

        const users: User[] = await this._userRepository
            .find({ where: { status: status.ACTIVE } });

        return users;

    }

    async create(user: User): Promise<User> {

        // TODO: details 
        const details = new UserDetails();
        user.details = details;

        // TODO: role
        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });

        user.roles = [defaultRole];

        const savedUser = await this._userRepository.save(user);
        return savedUser;
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository
            .findOne(id, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException('El Usuario no existe');
        }

        await this._userRepository.update(id, { status: status.INACTIVE });

    }

    async setRolToUser(userId: number, roleId: number) {

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
