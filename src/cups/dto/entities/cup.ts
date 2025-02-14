import { BadRequestException } from '@nestjs/common';
import { CreateCupDto } from '../create-cup.dto';

export class Cup {
  private size: number;
  private id?: string;
  constructor(data: CreateCupDto) {
    if (!Number(data.size)) {
      throw new BadRequestException(
        'Verifique se o tamanho do copo é valido.',
        { description: 'Tamanho invalido' },
      );
    }

    this.size = data.size;
    this.id = `${data.id}`;
  }

  toJSON() {
    return { size: this.size, id: this.id };
  }
}
