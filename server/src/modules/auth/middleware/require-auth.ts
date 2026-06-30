import type { RequestHandler } from 'express';

import { AppError } from '../../../shared/http/app-error.js';
import { verifyAccessToken } from '../services/token.service.js';

const BEARER_PREFIX = 'Bearer ';

/**
 * Route guard: require a valid access token.
 *
 * Reads the bearer token from the `Authorization` header, verifies it, and
 * attaches the principal to `req.user`. Rejects with `401` if the header is
 * missing/malformed or the token is invalid or expired. No database round-trip
 * — authorization is derived entirely from the signed token.
 */
export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith(BEARER_PREFIX)) {
      throw AppError.unauthorized('Missing or malformed Authorization header');
    }

    const token = header.slice(BEARER_PREFIX.length);
    const payload = await verifyAccessToken(token);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next(error);
  }
};
