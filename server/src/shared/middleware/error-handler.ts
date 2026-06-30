import type { ErrorRequestHandler } from 'express';

import { env } from '../../config/env.js';
import { logger } from '../logger/logger.js';
import { AppError } from '../http/app-error.js';

/** The single error response shape returned for every failure. */
interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Centralized error handler — the last middleware in the pipeline.
 *
 * Express 5 forwards both synchronous throws and rejected promises from route
 * handlers here, so this is the one place that translates any failure into a
 * consistent HTTP response. Known `AppError`s map to their status/code;
 * everything else is treated as an unexpected 500. Internal details and stack
 * traces are logged but never leaked to clients in production.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : 'INTERNAL_ERROR';
  const isOperational = isAppError ? err.isOperational : false;

  if (isOperational && statusCode < 500) {
    logger.warn({ statusCode, code }, err instanceof Error ? err.message : 'Operational error');
  } else {
    logger.error({ err, statusCode, code }, 'Unhandled error');
  }

  // Never expose internal failure details in production.
  const exposeMessage = statusCode < 500 || env.NODE_ENV !== 'production';
  const message = exposeMessage && err instanceof Error ? err.message : 'Internal server error';

  const body: ErrorResponseBody = { error: { code, message } };
  if (isAppError && err.details !== undefined) {
    body.error.details = err.details;
  }

  res.status(statusCode).json(body);
};
