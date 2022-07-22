import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/http-exception.filter';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app
    .listen(9092)
    .then(() => console.log('[http] 9092 - Server running'));
}
bootstrap();
