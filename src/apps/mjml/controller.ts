import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JsonError, JsonOk } from 'src/lib/helper';
import { ApiResponseWith, MjmlPayload, MjmlResponse } from 'src/lib/models';
import { MjmlService } from './service';

@ApiTags('Mjml')
@Controller({
  path: 'mjml',
})
export class MjmlController {
  constructor(private readonly svc: MjmlService) {}

  @Post()
  @HttpCode(200)
  @ApiResponseWith({
    status: 200,
    description: 'OK',
    type: MjmlResponse,
  })
  @ApiOperation({ operationId: 'MjmlToHtml' })
  toHtml(@Body() body: MjmlPayload) {
    try {
      const res = this.svc.parse(body.mjml);
      if (res.errors.length) {
        return JsonError(res.errors[0].message);
      }
      return JsonOk({
        html: res.html.replace(/\n/g, ''),
      });
    } catch (error) {
      return JsonError(error?.message);
    }
  }
}
