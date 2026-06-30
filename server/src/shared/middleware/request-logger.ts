import { pinoHttp } from 'pino-http';

import { logger } from '../logger/logger.js';

/**
 * Per-request logging middleware.
 *
 * Wraps each request with a child logger (attached as `req.log`), emitting a
 * structured log line per request with method, URL, status, and latency. Reuses
 * the application logger so configuration and transport stay consistent.
 */
export const requestLogger = pinoHttp({ logger });
