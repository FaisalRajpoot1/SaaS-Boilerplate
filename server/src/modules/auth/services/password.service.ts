import { hash, verify } from '@node-rs/argon2';

/**
 * Password hashing service.
 *
 * Uses argon2id — the algorithm recommended by OWASP for password storage —
 * which is resistant to both GPU and side-channel attacks. `@node-rs/argon2`
 * ships prebuilt native binaries (no compilation step) and applies sensible
 * defaults; a per-hash random salt is generated internally and embedded in the
 * output string, so no separate salt storage is needed.
 */

/** Hash a plaintext password for storage. */
export function hashPassword(plainPassword: string): Promise<string> {
  return hash(plainPassword);
}

/**
 * Verify a plaintext password against a stored hash. Returns `false` (never
 * throws) on mismatch or malformed hash, so callers can treat it as a boolean.
 */
export async function verifyPassword(storedHash: string, plainPassword: string): Promise<boolean> {
  try {
    return await verify(storedHash, plainPassword);
  } catch {
    return false;
  }
}
