import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { ArcjetGuard } from './auth/arcjet/arcjet.guard';
import { ARCJET_CLIENT } from './auth/arcjet/arcjet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );

  app.useGlobalInterceptors(
    new TransformResponseInterceptor(),
  );


  //global guard for arcjet
  // const arcjetClient = app.get(ARCJET_CLIENT);

  // app.useGlobalGuards(
  //   new ArcjetGuard(arcjetClient, new Reflector()),
  // );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();