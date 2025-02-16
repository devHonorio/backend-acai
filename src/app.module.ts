import { Module } from '@nestjs/common';
import { CupsModule } from './cups/cups.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CupsModule, UsersModule],
})
export class AppModule {}
