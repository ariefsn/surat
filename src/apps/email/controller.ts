import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JsonError, JsonOk, logger } from 'src/lib/helper';
import { ApiResponseWith } from 'src/lib/models';
import { EmailPayload, SendMailResult } from 'src/lib/models/email';
import { MjmlService } from '../mjml/service';
import { EmailService } from './service';

@ApiTags('Email')
@Controller({
  path: 'email',
})
export class EmailController {
  constructor(
    private readonly svc: EmailService,
    private readonly mjmlSvc: MjmlService,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiResponseWith({
    status: 200,
    description: 'OK',
    type: SendMailResult,
  })
  @ApiResponseWith({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({ operationId: 'EmailSend' })
  async send(@Body() body: EmailPayload) {
    try {
      const res = await this.svc.send(body);
      logger.info('Send email success.', res);
      return JsonOk(res);
    } catch (error) {
      logger.error('Send email failed. Error: ' + error);
      return JsonError(error?.message);
    }
  }
}
