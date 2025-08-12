
import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('api/auth')
export class MeController {
  @UseGuards(JwtAuthGuard)
  @Post('me')
  me(@Req() req: Request) {
    // JwtAuthGuard attaches decoded token payload to req['user']
    return req['user'];
  }
}
