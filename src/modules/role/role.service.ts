import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dtos';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async get(id: number): Promise<ReadRoleDto> {

        if (!id) {
            throw new BadRequestException('El id no fue enviado');
        }

        const role: Role = await this._roleRepository
            .findOne(id, { where: { status: 'ACTIVE' } });

        if (!role) {
            throw new NotFoundException('El Role no existe');
        }

        return plainToClass(ReadRoleDto, role);

    }

    async getAll(): Promise<ReadRoleDto[]> {

        const roles: Role[] = await this._roleRepository
            .find({ where: { status: 'ACTIVE' } });

        return roles.map((role: Role) => plainToClass(ReadRoleDto, role));

    }

    async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {

        const savedRole = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, savedRole);
    }

    async update(roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {

        const foundRole = await this._roleRepository.findOne(roleId, {
            where: { status: status.ACTIVE },
        });

        if (!foundRole) {
            throw new NotFoundException('El rol no existe o está inactivo');
        }

        foundRole.name = role.name;
        foundRole.description = role.description;

        const updatedRole: Role = await this._roleRepository.save(foundRole);

        return plainToClass(ReadRoleDto, updatedRole);
    }

    async delete(id: number): Promise<void> {
        const roleExist = await this._roleRepository
            .findOne(id, { where: { status: 'ACTIVE' } });

        if (!roleExist) {
            throw new NotFoundException('El Role no existe');
        }

        await this._roleRepository.update(id, { status: 'INACTIVE' });

    }
}
