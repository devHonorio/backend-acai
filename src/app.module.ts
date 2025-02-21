import { Module } from '@nestjs/common';
import { CupsModule } from './cups/cups.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [CupsModule, UsersModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
