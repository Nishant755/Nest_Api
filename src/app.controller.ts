import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipArcjet } from './auth/arcjet/skip-arcjet.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @SkipArcjet()
  @Get('health')
  health() {
    return this.appService.getHello();
  }
}
