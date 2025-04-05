import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from '@/domain/application/mail/mail-processor';
import { Nodemailer } from './nodemailer/nodemailer';
import { EnvModule } from '../env/env.module';
import { EmailProcessor } from '../bull/email-processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    EnvModule,
  ],
  providers: [
    {
      provide: MailProcessor,
      useClass: Nodemailer,
    },
    EmailProcessor,
  ],
  exports: [MailProcessor, BullModule],
})
export class MailModule {}
