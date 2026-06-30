import { describe, expect, it } from 'vitest';

import { EmailService } from './email.service.js';
import type { EmailMessage, Mailer } from './mailer.js';

class FakeMailer implements Mailer {
  readonly sent: EmailMessage[] = [];

  send(message: EmailMessage): Promise<void> {
    this.sent.push(message);
    return Promise.resolve();
  }
}

describe('EmailService', () => {
  it('sends a verification email with a tokenized link', async () => {
    const mailer = new FakeMailer();
    await new EmailService(mailer).sendVerificationEmail('user@example.com', 'verify-tok');

    expect(mailer.sent).toHaveLength(1);
    const message = mailer.sent[0];
    expect(message?.to).toBe('user@example.com');
    expect(message?.subject).toMatch(/verify/i);
    expect(message?.text).toContain('verify-tok');
    expect(message?.html).toContain('verify-email?token=verify-tok');
  });

  it('sends a password reset email with a tokenized link', async () => {
    const mailer = new FakeMailer();
    await new EmailService(mailer).sendPasswordResetEmail('user@example.com', 'reset-tok');

    const message = mailer.sent[0];
    expect(message?.subject).toMatch(/reset/i);
    expect(message?.text).toContain('reset-tok');
    expect(message?.html).toContain('reset-password?token=reset-tok');
  });

  it('url-encodes tokens in links', async () => {
    const mailer = new FakeMailer();
    await new EmailService(mailer).sendVerificationEmail('user@example.com', 'a b/c+d');

    expect(mailer.sent[0]?.html).toContain('token=a%20b%2Fc%2Bd');
  });
});
