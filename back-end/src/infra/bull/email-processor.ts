import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailProcessor } from '@/domain/application/mail/mail-processor';
import { Injectable } from '@nestjs/common';

@Processor('email')
@Injectable()
export class EmailProcessor {
  constructor(private readonly mailer: MailProcessor) {}

  @Process('email')
  async handleSendWelcomeEmail(job: Job) {
    const { to, subject, body, replyTo } = job.data;
    console.log(`✅ Email enviado para: ${to}`);
    try {
      const teste = await this.mailer.sendMail({
        to,
        subject,
        body,
        replyTo,
      });
      console.log('📧 Resultado do envio de e-mail:', teste);
    } catch (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
    }
  }
}
