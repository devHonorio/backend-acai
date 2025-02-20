import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { signInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/Payload';
import { compare } from 'bcrypt';
import { Rulles } from 'src/rulles/rulles';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ password, phone }: signInDto) {
    const user = await this.userService.findOne(phone);

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Senha incorreta.');

    const payload: Payload = {
      sub: user.id,
      username: user.name,
      phone: user.phone,
      rulles: user.rulles as Rulles[],
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
