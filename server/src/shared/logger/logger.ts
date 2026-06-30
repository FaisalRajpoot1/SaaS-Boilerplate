import { pino, type Logger } from 'pino';

import { env } from '../../config/env.js';

// Silence logs during tests to keep test output readable; otherwise honour the
// configured level.
const level = env.NODE_ENV === 'test' ? 'silent' : env.LOG_LEVEL;

/**
 * Application-wide structured logger.
 *
 * Always emits raw JSON on stdout — cheap to produce and trivially ingested by
 * log aggregators (Datadog, Loki, CloudWatch, …). Human-friendly formatting in
 * development is handled OUTSIDE the process by piping through the `pino-pretty`
 * CLI (see the `dev` script). We deliberately avoid pino's in-process transport
 * because it runs in a worker thread that does not inherit the `tsx` ESM loader,
 * which hangs the dev server.
 *
 * Always log through this instance rather than `console` so output stays
 * structured, level-filtered, and centrally configurable.
 */
export const logger: Logger = pino({ level });
