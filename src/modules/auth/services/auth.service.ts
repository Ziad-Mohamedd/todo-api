import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../../users/users.service';
import { HashService } from './hash.service';
import { ConfigService } from '@nestjs/config';
import { LoginDTO } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result as User;
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const passwordHash = await this.hashService.hashPassword(password);
    const isMatch = await this.hashService.isPasswordMatch(
      user.password,
      passwordHash,
    );

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as User;
    }

    return null;
  }

  async login(body: LoginDTO) {
    const userData = await this.usersService.findOneByEmail(body.email);

    const payload = { username: body.email, sub: userData.id };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userData;

    return {
      user,
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
      }),
    };
  }
}
