import express, { type Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { errorHandler } from '../../../shared/middleware/error-handler.js';
import { signAccessToken } from '../services/token.service.js';
import { requireAuth } from './require-auth.js';

function buildApp(): Express {
  const app = express();
  app.get('/protected', requireAuth, (req, res) => {
    res.status(200).json(req.user);
  });
  app.use(errorHandler);
  return app;
}

describe('requireAuth', () => {
  it('allows a request with a valid bearer token and exposes req.user', async () => {
    const token = await signAccessToken('user-42');

    const res = await request(buildApp()).get('/protected').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ userId: 'user-42' });
  });

  it('rejects a request with no Authorization header', async () => {
    const res = await request(buildApp()).get('/protected');

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects a malformed Authorization header', async () => {
    const res = await request(buildApp()).get('/protected').set('Authorization', 'Token abc');

    expect(res.status).toBe(401);
  });

  it('rejects an invalid token', async () => {
    const res = await request(buildApp())
      .get('/protected')
      .set('Authorization', 'Bearer not.a.valid.token');

    expect(res.status).toBe(401);
  });
});
