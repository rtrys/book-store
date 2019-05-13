import { Controller, Post, Get, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Post('/register')
  register(
    @Body()
    userDto: UserDto,
  ) {
    return this.usersService.register(userDto);
  }

  @Post('/login')
  login(
    @Body()
    userDto: UserDto,
  ) {
    return this.usersService.login(userDto);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@User('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Delete(':id')
  removeById(
    @Param('id')
    id: string,
  ) {
    return this.usersService.removeById(id);
  }

}
