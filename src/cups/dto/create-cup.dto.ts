import { Prisma } from '@prisma/client';

export class CreateCupDto implements Prisma.CupCreateInput {
  id?: string;
  size: number;
}
