import express, { type Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { errorHandler } from './error-handler.js';
import { validateBody } from './validate.js';

const schema = z.object({
  email: z.email(),
  age: z.coerce.number().int().positive(),
});

function buildApp(): Express {
  const app = express();
  app.use(express.json());
  app.post('/t', validateBody(schema), (req, res) => {
    res.status(200).json(req.body);
  });
  app.use(errorHandler);
  return app;
}

describe('validateBody', () => {
  it('passes and coerces valid input', async () => {
    const res = await request(buildApp()).post('/t').send({ email: 'a@b.com', age: '30' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ email: 'a@b.com', age: 30 });
  });

  it('rejects invalid input with a 400 and field details', async () => {
    const res = await request(buildApp()).post('/t').send({ email: 'nope', age: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
    expect(Array.isArray(res.body.error.details)).toBe(true);
    const paths = (res.body.error.details as { path: string }[]).map((d) => d.path);
    expect(paths).toContain('email');
    expect(paths).toContain('age');
  });
});
