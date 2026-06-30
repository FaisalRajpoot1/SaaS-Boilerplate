import type { Server } from 'node:http';

import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './shared/logger/logger.js';

/**
 * Process bootstrap.
 *
 * Owns the runtime lifecycle only: start listening, handle fatal process-level
 * errors, and shut down gracefully. The application itself is built by
 * `createApp()` so it can be tested in isolation without ever binding a port.
 */
const app = createApp();

const server: Server = app.listen(env.PORT, () => {
  logger.info(`🚀 Server listening on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
});

/**
 * Gracefully drain in-flight connections before exiting so we never drop
 * requests during a deploy/restart.
 */
function shutdown(signal: NodeJS.Signals): void {
  logger.info(`${signal} received — shutting down gracefully…`);

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Error during shutdown');
      process.exit(1);
    }
    logger.info('HTTP server closed.');
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Last-resort safety nets. A process in an unknown state should not keep
// serving traffic — log loudly and let the orchestrator restart it.
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled promise rejection — exiting');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception — exiting');
  process.exit(1);
});
