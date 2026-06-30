import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../http/app-error.js';

/**
 * Build middleware that validates `req.body` against a Zod schema.
 *
 * On success the parsed (and coerced) value replaces `req.body`, so handlers
 * receive clean, typed input. On failure a `400 BAD_REQUEST` `AppError` is
 * forwarded, carrying per-field details in the standard error envelope.
 */
export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      next(AppError.badRequest('Validation failed', details));
      return;
    }

    req.body = result.data;
    next();
  };
}
