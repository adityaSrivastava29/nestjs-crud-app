import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${process.env.MODE}`);
  console.log(`Database: ${process.env.POSTGRES_DATABASE}`);
  console.log(`Port: ${process.env.PORT}`);
  console.log(`Postgres Host: ${process.env.POSTGRES_HOST}`);
  console.log(`Postgres Port: ${process.env.POSTGRES_PORT}`);
  console.log(`Postgres User: ${process.env.POSTGRES_USER}`);
}
void bootstrap();
