import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { CreateRoleDto } from './dtos';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService,
    ) { }

    @Get(':roleId')
    getRole(@Param('roleId', ParseIntPipe) id: number): Promise<ReadRoleDto> {
        return this._roleService.get(id);
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]> {
        return this._roleService.getAll();
    }

    @Post()
    createdrole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.create(role);
    }

    @Patch(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) id: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.update(id, role);
    }

    @Delete(':roleId')
    deleteRole(@Param('roleId', ParseIntPipe) id: number) {
        return this._roleService.delete(id);
    }
}
