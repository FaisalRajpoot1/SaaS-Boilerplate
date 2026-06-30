import nodemailer, { type Transporter } from 'nodemailer';

import { env } from '../../../config/env.js';
import type { EmailMessage, Mailer } from '../mailer.js';

/**
 * SMTP transport via nodemailer. Works with any SMTP provider (Mailtrap, SES,
 * Postmark, Resend SMTP, …). SMTP settings are validated at boot when
 * `EMAIL_TRANSPORT=smtp`, so this is only constructed with a complete config.
 */
export class SmtpMailer implements Mailer {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // implicit TLS on 465; STARTTLS otherwise
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }

  async send(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: env.EMAIL_FROM,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}
