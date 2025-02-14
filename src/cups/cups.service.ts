import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class CupsService {
  constructor(private prisma: PrismaService) {}
  private async findOneCup(id: string) {
    return await this.prisma.cup.findUnique({ where: { id } });
  }
  async create(createCupDto: CreateCupDto) {
    try {
      await this.prisma.cup.create({ data: createCupDto });
    } catch (error) {
      throw new BadRequestException('Esse copo já existe.', {
        cause: error,
        description: 'Se teve ter um único copo de um mesmo tamanho',
      });
    }
  }

  async findAll() {
    return await this.prisma.cup.findMany({ orderBy: { size: 'asc' } });
  }

  async findOne(id: string) {
    return await this.prisma.cup.findUnique({ where: { id } });
  }

  async update(id: string, updateCupDto: UpdateCupDto) {
    const cupExists = await this.findOneCup(id);

    if (!cupExists) throw new NotFoundException('Copo não encontrado.');

    return await this.prisma.cup.update({
      where: { id },
      data: updateCupDto,
    });
  }

  async remove(id: string) {
    const cupExists = await this.findOneCup(id);

    if (!cupExists)
      throw new NotFoundException('Copo não encontrado para ser deletado.');

    return await this.prisma.cup.delete({ where: { id } });
  }
}
