import {
  MailProcessor,
  SendMailRequest,
} from '@/domain/application/mail/mail-processor';
import { EnvService } from '@/infra/env/env.service';
import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class Nodemailer implements MailProcessor {
  private transporter: Transporter;

  constructor(private envService: EnvService) {
    const auth = {
      user: this.envService.get('EMAIL_USER'),
      pass: this.envService.get('EMAIL_PASS'),
    };

    this.transporter = createTransport({
      host: 'mail.apisiteslitoralcar.com.br',
      port: 465,
      secure: true,
      auth,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(request: SendMailRequest): Promise<void> {
    const { to, subject, body, replyTo } = request;

    await this.transporter.sendMail({
      from: this.envService.get('EMAIL_USER'),
      to,
      subject,
      html: body,
      replyTo,
    });
  }
}
