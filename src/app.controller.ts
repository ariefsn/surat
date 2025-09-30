import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JsonOk } from './lib/helper';
import { ApiResponseWith } from './lib/models';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiResponseWith({
    status: 200,
    description: 'OK',
    type: String,
  })
  getHello() {
    return JsonOk(this.appService.getHello());
  }
}
