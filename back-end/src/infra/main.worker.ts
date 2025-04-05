import { NestFactory } from '@nestjs/core';
import { MailModule } from './mail/mail.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(MailModule);
}
bootstrap();
