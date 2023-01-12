import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { AuthDto } from './dto/auth.dto';

import { UserService } from 'src/user/user.service';
import { now } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    // find user by email and report error if not registered
    const user = await this.userService.emailIsRegistered(dto.email);
    if (!user)
      return { error: `No user registered with given email: ${dto.email}` };
    // compare passwords and throw error if wrong password
    const pwdMatches = await argon.verify(user.hash, dto.password);
    if (!pwdMatches) return { error: 'Incorrect credentials' };
    // return a jwt token based on the saved user data
    return await this.signToken(user['_id'], user.email);
  }

  async register(dto: AuthDto) {
    // return error if there is an user with given email
    const userExists = await this.userService.emailIsRegistered(dto.email);
    if (userExists)
      return { error: `An user already exists with email: ${dto.email}` };
    // generate password hash
    const hash = await argon.hash(dto.password);
    // save newUser in DB
    const user = await this.userService.createUser({
      email: dto.email,
      hash: hash,
      firstName: '',
      lastName: '',
      createdAt: now(),
      updatedAt: now(),
    });
    // return a jwt token based on the saved user data
    return await this.signToken(user['_id'], user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload_data = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload_data, {
      expiresIn: '24h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
