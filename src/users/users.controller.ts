import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RullesGuard } from 'src/users/rulles.guard ';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RullesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = new User(createUserDto);

    return this.usersService.create(user.toJSON());
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.usersService.findOne(phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
