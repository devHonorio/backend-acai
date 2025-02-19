import { Module } from '@nestjs/common';
import { CupsModule } from './cups/cups.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CupsModule, UsersModule, AuthModule],
})
export class AppModule {}
