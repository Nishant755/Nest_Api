import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './auth/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ArcjetModule } from './auth/arcjet/arcjet.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: false,
    }),
    AuthModule,   //module based auth
    ArcjetModule, //module based arcjet
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
