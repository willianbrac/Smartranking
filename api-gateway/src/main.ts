import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from 'src/filters/http-exception.filter';
import { AppModule } from './app.module';

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
    .listen(3001)
    .then(() => console.log('[http] 3001 - Gateway service running'));
}
bootstrap();
