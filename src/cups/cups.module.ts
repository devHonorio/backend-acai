import { Module } from '@nestjs/common';
import { CupsService } from './cups.service';
import { CupsController } from './cups.controller';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CupsController],
  providers: [CupsService],
})
export class CupsModule {}
