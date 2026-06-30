interface LayoutParams {
  heading: string;
  /** Inner HTML for the message body. */
  bodyHtml: string;
}

/**
 * Minimal, email-client-safe HTML shell with inline styles (email clients
 * strip <style> and class-based CSS). Keeps a consistent, branded frame around
 * every transactional email.
 */
export function emailLayout({ heading, bodyHtml }: LayoutParams): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:Helvetica,Arial,sans-serif;color:#1a1d23;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e6e8eb;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 0;">
                <span style="font-weight:700;font-size:16px;letter-spacing:-0.01em;">SaaS Boilerplate Pro</span>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">${heading}</h1>
                ${bodyHtml}
              </td>
            </tr>
          </table>
          <p style="max-width:480px;margin:16px auto 0;font-size:12px;color:#8a93a6;text-align:center;">
            You received this email because an account action was requested. If this wasn't you, you can safely ignore it.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A primary call-to-action button (inline-styled for email clients). */
export function emailButton(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:#1a1d23;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px;">${label}</a>`;
}
