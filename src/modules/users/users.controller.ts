import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param() { id }) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  findOne(@Param() { email }) {
    return this.userService.findOneByEmail(email);
  }
}
