import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string) {
    const salt = this.configService.get('jwt.salt');
    return await bcrypt.hash(password, salt);
  }

  async isPasswordMatch(password: string, hash: string) {
    return password === hash;
  }
}
