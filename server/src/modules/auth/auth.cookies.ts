import type { Response } from 'express';

import { env } from '../../config/env.js';

/** Name of the httpOnly cookie that carries the refresh token. */
export const REFRESH_COOKIE_NAME = 'refresh_token';

// Scope the cookie to the auth routes so it isn't sent on every request.
const REFRESH_COOKIE_PATH = '/api/v1/auth';

/**
 * Store the refresh token in a hardened cookie:
 * - `httpOnly`  → unreadable from JS (mitigates XSS token theft)
 * - `secure`    → HTTPS-only in production
 * - `sameSite`  → 'lax' to limit CSRF while allowing top-level navigation
 *
 * NOTE: state-changing auth routes still need explicit CSRF protection, added
 * alongside the refresh endpoint.
 */
export function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: REFRESH_COOKIE_PATH,
    maxAge: env.REFRESH_TOKEN_TTL_SECONDS * 1000,
  });
}

/** Clear the refresh cookie (logout / rotation invalidation). */
export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_COOKIE_PATH });
}
