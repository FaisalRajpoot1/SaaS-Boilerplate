import type { Request, Response } from 'express';

/**
 * Liveness/health probe.
 *
 * Returns a lightweight, dependency-free snapshot used by load balancers,
 * container orchestrators (Docker/K8s), and uptime monitors to decide whether
 * this instance is alive. Deep readiness checks (DB, Redis, etc.) are added as
 * those dependencies are introduced.
 */
export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
