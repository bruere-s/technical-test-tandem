import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Enable CORS
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}
bootstrap();