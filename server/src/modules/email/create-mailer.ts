import { env } from '../../config/env.js';
import type { Mailer } from './mailer.js';
import { ConsoleMailer } from './transports/console-mailer.js';
import { SmtpMailer } from './transports/smtp-mailer.js';

/** Construct the configured mailer transport. */
export function createMailer(): Mailer {
  switch (env.EMAIL_TRANSPORT) {
    case 'smtp':
      return new SmtpMailer();
    case 'console':
      return new ConsoleMailer();
  }
}
