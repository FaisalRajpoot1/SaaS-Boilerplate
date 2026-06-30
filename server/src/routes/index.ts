import type { Express } from 'express';

import { healthRouter } from '../modules/health/health.routes.js';

/**
 * Central route registry.
 *
 * Every feature module exposes its own router; this is the single place where
 * they are mounted onto the application. Versioned API routes (`/api/v1/...`)
 * are introduced alongside the first real feature module (M1 — Auth).
 */
export function registerRoutes(app: Express): void {
  app.use('/health', healthRouter);
}
