import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const PORT = process.env.SERVER_PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
