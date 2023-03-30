import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from '../auth/services/hash.service';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [ConfigService, UsersService, HashService, PrismaService],
})
export class UsersModule {}
