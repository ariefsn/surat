import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MJMLJsonObject, MJMLParseResults } from 'mjml-core';
import { IEnv } from 'src/lib/models';
import Mjml = require('mjml');

@Injectable()
export class MjmlService {
  constructor(private env: ConfigService<IEnv>) {}

  parse(mjml: string): MJMLParseResults {
    return Mjml(mjml);
  }

  toHtml(mjml: string): string {
    return this.parse(mjml).html;
  }

  toJson(mjml: string): MJMLJsonObject {
    return this.parse(mjml).json;
  }
}
