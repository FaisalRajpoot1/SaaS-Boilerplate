import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../../app.js';

describe('GET /health', () => {
  it('returns 200 with a healthy status payload', async () => {
    const app = createApp();

    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
    expect(typeof res.body.uptime).toBe('number');
    expect(typeof res.body.timestamp).toBe('string');
  });

  it('does not leak the X-Powered-By header', async () => {
    const app = createApp();

    const res = await request(app).get('/health');

    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('applies helmet security headers', async () => {
    const app = createApp();

    const res = await request(app).get('/health');

    // Set by helmet — confirms the security middleware is wired into the app.
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('returns the consistent error envelope for unknown routes', async () => {
    const app = createApp();

    const res = await request(app).get('/no-such-route');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
