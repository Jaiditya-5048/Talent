
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { GlobalHttpExceptionFilter } from './shared/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Fullstack API')
    .setVersion('0.1.0')
    .addCookieAuth('auth_token')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, doc);

  await app.listen(config.BACKEND_PORT);
  console.log(`Backend listening on ${config.BACKEND_PORT}`);
}
bootstrap();
