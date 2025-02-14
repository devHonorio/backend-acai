import { Module } from '@nestjs/common';
import { CupsService } from './cups.service';
import { CupsController } from './cups.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [CupsController],
  providers: [CupsService, PrismaService],
})
export class CupsModule {}
