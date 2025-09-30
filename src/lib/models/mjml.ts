import { ApiProperty } from '@nestjs/swagger';

export class MjmlPayload {
  @ApiProperty()
  mjml: string;
}

export class MjmlResponse {
  @ApiProperty()
  html: string;
}
