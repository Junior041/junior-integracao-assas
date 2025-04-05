export type SendMailRequest = {
  to?: string[];
  subject: string;
  body: string;
  replyTo?: string;
};

export abstract class MailProcessor {
  abstract sendMail(request: SendMailRequest): Promise<void>;
}
