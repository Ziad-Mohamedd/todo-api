import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('server.port');

  await app.listen(port);

  console.log(`On http://localhost:${port}`);
}
bootstrap();
