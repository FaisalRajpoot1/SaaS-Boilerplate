import { PrismaClient } from '@prisma/client';

import { env } from '../config/env.js';

/**
 * Shared PrismaClient instance.
 *
 * In development, `tsx watch` reloads modules on every change; without a guard
 * each reload would open a new pool of database connections and eventually
 * exhaust Postgres. Caching the client on `globalThis` keeps a single instance
 * across reloads. In production a fresh process always starts clean, so we don't
 * attach it to the global there.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
