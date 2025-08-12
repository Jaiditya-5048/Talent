
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MeController } from './me.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../shared/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: config.JWT_EXPIRES_IN }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController, MeController],
  exports: [AuthService]
})
export class AuthModule {}
