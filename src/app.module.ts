import { Module } from '@nestjs/common';
import { CupsModule } from './cups/cups.module';

@Module({
  imports: [CupsModule],
})
export class AppModule {}
