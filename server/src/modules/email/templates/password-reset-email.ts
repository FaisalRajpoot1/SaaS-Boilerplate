import type { EmailMessage } from '../mailer.js';
import { emailButton, emailLayout } from './layout.js';

/** Build the "reset your password" message. */
export function renderPasswordResetEmail(params: { to: string; url: string }): EmailMessage {
  const subject = 'Reset your password';

  const text = [
    'We received a request to reset your password.',
    '',
    'Reset it using this link:',
    params.url,
    '',
    "If you didn't request this, you can ignore this email — your password won't change.",
  ].join('\n');

  const html = emailLayout({
    heading: 'Reset your password',
    bodyHtml: `
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#3a4150;">
        We received a request to reset your password. This link expires shortly.
      </p>
      ${emailButton('Reset password', params.url)}
      <p style="margin:22px 0 0;font-size:13px;color:#8a93a6;word-break:break-all;">
        Or paste this link into your browser:<br />${params.url}
      </p>`,
  });

  return { to: params.to, subject, html, text };
}
