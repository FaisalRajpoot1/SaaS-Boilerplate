/** A renderable email message (the transport supplies the `From` address). */
export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Port for sending email. Application code depends on this interface, never on a
 * concrete provider, so the transport can be swapped (console, SMTP, a hosted
 * API) without touching callers.
 */
export interface Mailer {
  send(message: EmailMessage): Promise<void>;
}
