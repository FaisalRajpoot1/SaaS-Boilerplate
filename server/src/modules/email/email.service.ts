import { env } from '../../config/env.js';
import { createMailer } from './create-mailer.js';
import type { Mailer } from './mailer.js';
import { renderPasswordResetEmail } from './templates/password-reset-email.js';
import { renderVerificationEmail } from './templates/verification-email.js';

/**
 * High-level transactional email API.
 *
 * Composes templates with a configured `Mailer`. The mailer is injected, so the
 * service is trivially testable with a fake transport. Link targets point at the
 * client app (`APP_URL`), which owns the verify/reset screens.
 */
export class EmailService {
  constructor(private readonly mailer: Mailer) {}

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const url = `${env.APP_URL}/verify-email?token=${encodeURIComponent(token)}`;
    await this.mailer.send(renderVerificationEmail({ to, url }));
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const url = `${env.APP_URL}/reset-password?token=${encodeURIComponent(token)}`;
    await this.mailer.send(renderPasswordResetEmail({ to, url }));
  }
}

/** Default application instance, wired to the configured transport. */
export const emailService = new EmailService(createMailer());
