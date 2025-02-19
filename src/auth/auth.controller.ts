import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Payload } from './entities/Payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: signInDto) {
    return await this.authService.signIn({
      phone: signIn.phone,
      password: signIn.password,
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request & { user: Payload }) {
    const { phone, sub, username } = req.user;
    return { id: sub, username, phone };
  }
}
