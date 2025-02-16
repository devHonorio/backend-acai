import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  id?: string | undefined;
  name: string;
  phone: string;
}
