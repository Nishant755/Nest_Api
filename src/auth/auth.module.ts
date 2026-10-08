import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/auth/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { JwtAuthGuard, JwtGuard } from './strategies/jwt/jwt.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secretKey',
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtGuard],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    JwtGuard,
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {}
