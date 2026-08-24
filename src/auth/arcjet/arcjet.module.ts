import { Module } from '@nestjs/common';
import { arcjetProvider } from './arcjet';
import { APP_GUARD } from '@nestjs/core';
import { ArcjetGuard } from './arcjet.guard';


@Module({ 
  providers: [
    arcjetProvider,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
  exports: [arcjetProvider],
})
export class ArcjetModule { }
