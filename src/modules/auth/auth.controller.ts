import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  public async registerStudent(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
}
