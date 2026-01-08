import { NestFactory } from '@nestjs/core';
import { RedeemModule } from './redeem.module';

async function bootstrap() {
  const app = await NestFactory.create(RedeemModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
