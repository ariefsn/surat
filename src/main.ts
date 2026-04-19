import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { Env } from './lib/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = Env();

  const bodyLimit = env.bodyLimit;

  app.use(json({ limit: bodyLimit }));
  app.use(urlencoded({ extended: true, limit: bodyLimit }));

  const config = new DocumentBuilder()
    .setTitle('Surat')
    .setDescription('The Surat API description')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(env.port, env.host);
}

bootstrap();
