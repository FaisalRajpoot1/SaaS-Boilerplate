import { describe, expect, it } from 'vitest';

import { AppError } from './app-error.js';

describe('AppError', () => {
  it('applies sensible defaults', () => {
    const err = new AppError({ message: 'boom' });

    expect(err).toBeInstanceOf(Error);
    expect(err.statusCode).toBe(500);
    expect(err.code).toBe('INTERNAL_ERROR');
    expect(err.isOperational).toBe(true);
    expect(err.details).toBeUndefined();
  });

  it('honours explicit params', () => {
    const err = new AppError({
      message: 'nope',
      statusCode: 422,
      code: 'UNPROCESSABLE',
      details: { field: 'email' },
    });

    expect(err.statusCode).toBe(422);
    expect(err.code).toBe('UNPROCESSABLE');
    expect(err.details).toEqual({ field: 'email' });
  });

  it.each([
    ['badRequest', AppError.badRequest(), 400, 'BAD_REQUEST'],
    ['unauthorized', AppError.unauthorized(), 401, 'UNAUTHORIZED'],
    ['forbidden', AppError.forbidden(), 403, 'FORBIDDEN'],
    ['notFound', AppError.notFound(), 404, 'NOT_FOUND'],
    ['conflict', AppError.conflict(), 409, 'CONFLICT'],
    ['internal', AppError.internal(), 500, 'INTERNAL_ERROR'],
  ] as const)('factory %s → %i / %s', (_name, err, statusCode, code) => {
    expect(err.statusCode).toBe(statusCode);
    expect(err.code).toBe(code);
  });

  it('marks unexpected internal errors as non-operational', () => {
    expect(AppError.internal().isOperational).toBe(false);
  });
});
