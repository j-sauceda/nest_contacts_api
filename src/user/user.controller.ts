import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  // Returns user information for authenticated user
  @ApiResponse({
    status: 200,
    description: 'Retrieves user information for an authenticated user',
  })
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
