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

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="padding: 20px; border-bottom: 1px solid #e0e0e0;">
            <h2 style="margin: 0; color: #333;">${subject}</h2>
          </div>
          <div style="padding: 20px; color: #555;">
            ${body}
          </div>
        </div>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.envService.get('EMAIL_USER'),
      to,
      subject,
      html: htmlTemplate,
      replyTo,
    });
  }
}
