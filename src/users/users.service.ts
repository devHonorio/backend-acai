import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/auth/consts';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return await this.prisma.user.create({
      data: { ...createUserDto, password: hash },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(phone: string) {
    return await this.prisma.user.findUnique({ where: { phone } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
