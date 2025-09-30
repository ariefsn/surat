import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/lib/middlewares';
import { MjmlController } from './controller';
import { MjmlService } from './service';

@Module({
  controllers: [MjmlController],
  providers: [MjmlService],
  exports: [],
})
export class MjmlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(MjmlController);
  }
}
