import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService,
    ) { }

    @Get(':userId')
    // @Roles('ADMIN', 'AUTHOR')
    // @UseGuards(AuthGuard(), RoleGuard)
    getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
        return this._userService.get(userId);
    }

    // @UseGuards(AuthGuard()) // se puede utilizar a nivel de método o a nivel de clase
    @Get()
    getUsers(): Promise<ReadUserDto[]> {
        return this._userService.getAll();
    }

    @Patch(':userId')
    updateUser(@Param('userId', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this._userService.update(id, user);
    }

    @Delete(':userId')
    deleteUser(@Param('userId', ParseIntPipe) id: number): Promise<boolean> {
        return this._userService.delete(id);
    }

    @Delete()
    deleteUsersInactive(): Promise<boolean> {
        return null; // this._userService.deleteAllInactive();
    }

    @Post('setRole/:userId/:roleId')
    setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number,
    ): Promise<boolean> {

        return this._userService.setRolToUser(userId, roleId);

    }

}
