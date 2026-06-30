import { createHash, randomBytes } from 'node:crypto';

import { jwtVerify, SignJWT } from 'jose';

import { env } from '../../../config/env.js';
import { AppError } from '../../../shared/http/app-error.js';

const accessTokenSecret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
const ACCESS_TOKEN_ALG = 'HS256';

/** Decoded access-token claims we rely on. */
export interface AccessTokenPayload {
  userId: string;
}

/**
 * Sign a short-lived access-token JWT for a user. The user id is stored in the
 * standard `sub` claim.
 */
export function signAccessToken(userId: string): Promise<string> {
  return new SignJWT()
    .setProtectedHeader({ alg: ACCESS_TOKEN_ALG })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${String(env.ACCESS_TOKEN_TTL_SECONDS)}s`)
    .sign(accessTokenSecret);
}

/**
 * Verify and decode an access token. Throws `401 AppError` if the token is
 * invalid, expired, or missing a subject.
 */
export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, accessTokenSecret, {
      algorithms: [ACCESS_TOKEN_ALG],
    });
    if (typeof payload.sub !== 'string') {
      throw AppError.unauthorized('Invalid token');
    }
    return { userId: payload.sub };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw AppError.unauthorized('Invalid or expired token');
  }
}

/**
 * Generate a cryptographically-random, opaque refresh token. This is the value
 * handed to the client (in an httpOnly cookie); only its hash is ever stored.
 */
export function generateRefreshToken(): string {
  return randomBytes(32).toString('base64url');
}

/**
 * Hash a refresh token for storage/lookup. SHA-256 is appropriate here (not
 * argon2) because the input is already high-entropy random data, so we want a
 * fast, deterministic digest we can index and compare.
 */
export function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
