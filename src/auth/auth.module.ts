import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/auth/prisma/prisma.module';
import { Jwt } from './strategies/jwt/jwt';
import { Jwt } from './strategies/jwt/jwt';
import * as config from 'dotenv';
config.config();

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, Jwt],
  controllers: [AuthController]
})
export class AuthModule { }
