import { Controller, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description:
      'Logs in an existing user. Creates and returns a new object containing a JWT access_token',
  })
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiResponse({
    status: 201,
    description:
      'Creates a new user register. Creates and returns a new object containing a JWT access_token',
  })
  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
