import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from '../auth/services/hash.service';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async createUser(userData: CreateUserDto) {
    const foundUser = await this.findOneByEmail(userData.email);
    if (foundUser) {
      throw new BadRequestException('email is already taken');
    }
    const passwordHash = await this.hashService.hashPassword(userData.password);

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        password: passwordHash,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restOfUserData } = user;

    return restOfUserData;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    return user;
  }
}
