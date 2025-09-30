import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './lib/models';

@Injectable()
export class AppService {
  constructor(private env: ConfigService<IEnv>) {}

  getHello(): string {
    return 'Pong';
  }
}
