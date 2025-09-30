import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IMap } from './common';

export class EmailAccount {
  @ApiProperty()
  email: string;

  @ApiProperty()
  @ApiPropertyOptional()
  name?: string;
}

export class EmailAttachment {
  @ApiProperty()
  content: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  @ApiPropertyOptional()
  type?: 'text/plain' | 'text/html';

  @ApiProperty()
  @ApiPropertyOptional()
  disposition?: 'inline' | 'attachment';

  @ApiProperty()
  @ApiPropertyOptional()
  contentId?: string;

  toSnakeCase(): IMap {
    return {
      content: this.content,
      filename: this.filename,
      type: this.type,
      disposition: this.disposition,
      content_id: this.contentId,
    };
  }
}

export class EmailPayload {
  @ApiProperty({ type: EmailAccount })
  from: EmailAccount;

  @ApiProperty({ type: [EmailAccount] })
  to: EmailAccount[];

  @ApiProperty()
  subject: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  @ApiPropertyOptional({ type: [EmailAccount] })
  cc?: EmailAccount[];

  @ApiProperty()
  @ApiPropertyOptional({ type: [EmailAccount] })
  bcc?: EmailAccount[];

  @ApiProperty()
  @ApiPropertyOptional()
  headers?: IMap;

  @ApiProperty()
  @ApiPropertyOptional()
  text?: string;

  @ApiProperty()
  @ApiPropertyOptional({ type: [EmailAttachment] })
  attachments?: EmailAttachment[];

  @ApiProperty()
  @ApiPropertyOptional()
  category?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  variables?: IMap;

  @ApiProperty()
  @ApiPropertyOptional()
  tags?: IMap;
}

export class EmailInfoDto {
  @ApiProperty({ type: [String] })
  accepted: string[];

  @ApiProperty({ type: [String] })
  rejected: string[];

  @ApiProperty({ type: [String] })
  ehlo: string[];

  @ApiProperty({ type: [String] })
  envelopeTime: number;

  @ApiProperty({ type: [String] })
  messageTime: number;

  @ApiProperty({ type: [String] })
  messageSize: number;

  @ApiProperty()
  response: string;

  @ApiProperty({ type: 'object', additionalProperties: false })
  envelope: Record<string, any>;

  @ApiProperty()
  messageId: string;
}

export class SendMailResult {
  @ApiProperty({ type: EmailInfoDto })
  email: EmailInfoDto;

  @ApiProperty()
  html: string;
}
