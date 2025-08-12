
import { Controller, Post, Body, Res, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(dto.email, dto.password);
    res.cookie('auth_token', token, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 });
    res.json({ user });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token');
    res.json({ message: 'Logged out' });
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  me(@Body() body: any, @Res() res: Response) {
    // JwtAuthGuard attaches user to request in req['user']; but here keep simple: client calls /me and cookie checked by guard
    res.json({ message: 'ok' });
  }
}
