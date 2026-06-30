import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import { env } from './config/env.js';
import { registerRoutes } from './routes/index.js';
import { errorHandler } from './shared/middleware/error-handler.js';
import { notFoundHandler } from './shared/middleware/not-found.js';
import { requestLogger } from './shared/middleware/request-logger.js';

/**
 * Application factory.
 *
 * Builds and wires the Express application (middleware → routes → error
 * handling) WITHOUT binding to a network port, so it stays trivially importable
 * in tests. The middleware order below is deliberate:
 *
 *   security headers → CORS → rate-limit → body parsers → request logging
 *     → routes → 404 → centralized error handler
 */
export function createApp(): Express {
  const app = express();

  // Do not advertise the framework — small, free security hardening default.
  app.disable('x-powered-by');

  // Trust the first proxy hop (LB / reverse proxy). Required for correct client
  // IPs (rate limiting) and secure cookies behind TLS terminators.
  app.set('trust proxy', 1);

  // 1. Security headers.
  app.use(helmet());

  // 2. CORS.
  app.use(cors({ origin: resolveCorsOrigin(), credentials: true }));

  // 3. Abuse protection — applies to every route.
  app.use(
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      limit: env.RATE_LIMIT_MAX,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    }),
  );

  // 4. Body & cookie parsers.
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // 5. Structured per-request logging.
  app.use(requestLogger);

  // 6. Feature routes.
  registerRoutes(app);

  // 7. Unmatched routes → 404, then the centralized error handler. Order
  //    matters: both must be registered last.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

/** Translate the `CORS_ORIGIN` env value into a value `cors` understands. */
function resolveCorsOrigin(): boolean | string[] {
  if (env.CORS_ORIGIN === '*') {
    return true;
  }
  return env.CORS_ORIGIN.split(',').map((origin) => origin.trim());
}
