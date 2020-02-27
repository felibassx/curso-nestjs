import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService,
    ) {

    }

    async get(id: number): Promise<UserDto> {

        if (!id) {
            throw new BadRequestException('El id no fue enviado');
        }

        const user: User = await this._userRepository
            .findOne(id, { where: { status: 'ACTIVE' } });

        if (!user) {
            throw new NotFoundException('El Usuario no existe');
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto());

    }

    async getAll(): Promise<UserDto> {

        const users: User[] = await this._userRepository
            .find({ where: { status: 'ACTIVE' } });

        return this._mapperService.mapCollection<User, UserDto>(users, new UserDto());

    }

    async create(user: User): Promise<UserDto> {
        const savedUser = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository
            .findOne(id, { where: { status: 'ACTIVE' } });

        if (!userExist) {
            throw new NotFoundException('El Usuario no existe');
        }

        await this._userRepository.update(id, { status: 'INACTIVE' });

    }
}
