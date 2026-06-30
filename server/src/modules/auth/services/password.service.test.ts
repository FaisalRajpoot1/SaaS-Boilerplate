import { describe, expect, it } from 'vitest';

import { hashPassword, verifyPassword } from './password.service.js';

describe('password service', () => {
  it('hashes to an argon2id string that differs from the input', async () => {
    const hash = await hashPassword('correct horse battery staple');

    expect(hash).not.toBe('correct horse battery staple');
    expect(hash.startsWith('$argon2id$')).toBe(true);
  });

  it('produces a unique salt per hash', async () => {
    const [a, b] = await Promise.all([
      hashPassword('same-password'),
      hashPassword('same-password'),
    ]);

    expect(a).not.toBe(b);
  });

  it('verifies a correct password', async () => {
    const hash = await hashPassword('s3cret-password');

    await expect(verifyPassword(hash, 's3cret-password')).resolves.toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const hash = await hashPassword('s3cret-password');

    await expect(verifyPassword(hash, 'wrong-password')).resolves.toBe(false);
  });

  it('returns false (does not throw) for a malformed hash', async () => {
    await expect(verifyPassword('not-a-real-hash', 'whatever')).resolves.toBe(false);
  });
});
