import type { EmailMessage } from '../mailer.js';
import { emailButton, emailLayout } from './layout.js';

/** Build the "verify your email" message. */
export function renderVerificationEmail(params: { to: string; url: string }): EmailMessage {
  const subject = 'Verify your email address';

  const text = [
    'Welcome to SaaS Boilerplate Pro!',
    '',
    'Confirm your email address by opening this link:',
    params.url,
    '',
    "If you didn't create an account, you can ignore this email.",
  ].join('\n');

  const html = emailLayout({
    heading: 'Confirm your email',
    bodyHtml: `
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#3a4150;">
        Thanks for signing up. Confirm your email address to activate your account.
      </p>
      ${emailButton('Verify email', params.url)}
      <p style="margin:22px 0 0;font-size:13px;color:#8a93a6;word-break:break-all;">
        Or paste this link into your browser:<br />${params.url}
      </p>`,
  });

  return { to: params.to, subject, html, text };
}
