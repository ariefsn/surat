import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/lib/middlewares';
import { MjmlService } from '../mjml/service';
import { EmailController } from './controller';
import { EmailService } from './service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, MjmlService],
  exports: [],
})
export class EmailModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(EmailController);
  }
}
