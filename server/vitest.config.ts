import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Provide the env the app validates at import time so tests that don't touch
    // the database still boot. Tests that DO hit the DB override this with a real
    // connection string.
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/saas_boilerplate_test?schema=public',
      ACCESS_TOKEN_SECRET: 'test-access-token-secret-at-least-32-characters-long',
    },
  },
});
