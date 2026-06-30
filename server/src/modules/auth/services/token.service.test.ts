import { describe, expect, it } from 'vitest';

import { AppError } from '../../../shared/http/app-error.js';
import {
  generateRefreshToken,
  hashRefreshToken,
  signAccessToken,
  verifyAccessToken,
} from './token.service.js';

describe('access tokens', () => {
  it('signs and verifies a token, recovering the user id', async () => {
    const token = await signAccessToken('user-123');

    expect(typeof token).toBe('string');
    await expect(verifyAccessToken(token)).resolves.toEqual({ userId: 'user-123' });
  });

  it('rejects a tampered/garbage token with a 401', async () => {
    await expect(verifyAccessToken('not.a.jwt')).rejects.toBeInstanceOf(AppError);
    await expect(verifyAccessToken('not.a.jwt')).rejects.toMatchObject({ statusCode: 401 });
  });

  it('rejects a token signed with a different secret', async () => {
    // A JWT with the right shape but signed by an unknown key must not verify.
    const foreign =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.' + 'aW52YWxpZHNpZ25hdHVyZXZhbHVlMDAwMDAwMDA';
    await expect(verifyAccessToken(foreign)).rejects.toBeInstanceOf(AppError);
  });
});

describe('refresh tokens', () => {
  it('generates a high-entropy, url-safe token', () => {
    const token = generateRefreshToken();

    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(token.length).toBeGreaterThanOrEqual(40);
  });

  it('generates a unique token each time', () => {
    expect(generateRefreshToken()).not.toBe(generateRefreshToken());
  });

  it('hashes deterministically and differs from the raw token', () => {
    const token = generateRefreshToken();
    const hash = hashRefreshToken(token);

    expect(hash).toBe(hashRefreshToken(token));
    expect(hash).not.toBe(token);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
