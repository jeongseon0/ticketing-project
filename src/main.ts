import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // json 형태로 받아온 정보를 dto 객체로 변환
    new ValidationPipe({
      transform: true
    })
  );

  await app.listen(3000);
}
bootstrap();
