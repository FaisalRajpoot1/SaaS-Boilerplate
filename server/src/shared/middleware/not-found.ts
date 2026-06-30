import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../http/app-error.js';

/**
 * Catch-all for unmatched routes.
 *
 * Mounted after all feature routes. Instead of responding directly, it forwards
 * a `NOT_FOUND` `AppError` to the central error handler so that 404s use the
 * exact same response envelope as every other error.
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(AppError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}
