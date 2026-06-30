import express, { type Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { AppError } from '../http/app-error.js';
import { errorHandler } from './error-handler.js';
import { notFoundHandler } from './not-found.js';

/**
 * Build a minimal app that exercises the error pipeline in isolation: a route
 * that throws an AppError, a route that throws an unexpected error, plus the
 * 404 and centralized error-handler middleware.
 */
function buildApp(): Express {
  const app = express();

  app.get('/app-error', () => {
    throw new AppError({ message: 'I am a teapot', statusCode: 418, code: 'TEAPOT' });
  });

  app.get('/boom', () => {
    throw new Error('unexpected failure');
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

describe('error pipeline', () => {
  it('maps an AppError to its status, code, and message', async () => {
    const res = await request(buildApp()).get('/app-error');

    expect(res.status).toBe(418);
    expect(res.body).toEqual({ error: { code: 'TEAPOT', message: 'I am a teapot' } });
  });

  it('maps an unexpected error to a generic 500', async () => {
    const res = await request(buildApp()).get('/boom');

    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
  });

  it('returns the consistent 404 envelope for unmatched routes', async () => {
    const res = await request(buildApp()).get('/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error.message).toContain('/does-not-exist');
  });
});
