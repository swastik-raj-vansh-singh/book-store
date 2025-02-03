// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so frontend can access from different origin/port
  app.enableCors();

  await app.listen(3000);
  console.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();
