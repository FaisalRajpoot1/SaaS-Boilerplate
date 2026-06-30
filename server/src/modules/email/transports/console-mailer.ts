import { logger } from '../../../shared/logger/logger.js';
import type { EmailMessage, Mailer } from '../mailer.js';

/**
 * Development transport: logs the message (including any action links in the
 * text body) instead of sending it. Lets developers grab verification/reset
 * links from the console without configuring a real mail provider.
 */
export class ConsoleMailer implements Mailer {
  send(message: EmailMessage): Promise<void> {
    logger.info(
      { to: message.to, subject: message.subject, body: message.text },
      '📧 [console mailer] email not sent (dev transport)',
    );
    return Promise.resolve();
  }
}
