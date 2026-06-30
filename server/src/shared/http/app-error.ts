interface AppErrorParams {
  message: string;
  /** HTTP status code to return. Defaults to 500. */
  statusCode?: number;
  /** Stable, machine-readable error code (e.g. `NOT_FOUND`). */
  code?: string;
  /**
   * `true` for expected, recoverable errors (bad input, missing resource);
   * `false` for programmer errors/bugs. Drives how the error is logged.
   */
  isOperational?: boolean;
  /** Optional structured context safe to expose to the client. */
  details?: unknown;
}

/**
 * Operational application error.
 *
 * Anything thrown as an `AppError` carries everything the central error handler
 * needs to produce a consistent HTTP response: status, a stable `code`, and
 * optional `details`. Use the static factories for common cases.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(params: AppErrorParams) {
    super(params.message);
    this.name = 'AppError';
    this.statusCode = params.statusCode ?? 500;
    this.code = params.code ?? 'INTERNAL_ERROR';
    this.isOperational = params.isOperational ?? true;
    if (params.details !== undefined) {
      this.details = params.details;
    }

    // Exclude the constructor frame from the captured stack trace.
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', details?: unknown): AppError {
    return new AppError({ message, statusCode: 400, code: 'BAD_REQUEST', details });
  }

  static unauthorized(message = 'Unauthorized'): AppError {
    return new AppError({ message, statusCode: 401, code: 'UNAUTHORIZED' });
  }

  static forbidden(message = 'Forbidden'): AppError {
    return new AppError({ message, statusCode: 403, code: 'FORBIDDEN' });
  }

  static notFound(message = 'Resource not found'): AppError {
    return new AppError({ message, statusCode: 404, code: 'NOT_FOUND' });
  }

  static conflict(message = 'Conflict', details?: unknown): AppError {
    return new AppError({ message, statusCode: 409, code: 'CONFLICT', details });
  }

  static internal(message = 'Internal server error'): AppError {
    return new AppError({ message, statusCode: 500, code: 'INTERNAL_ERROR', isOperational: false });
  }
}
