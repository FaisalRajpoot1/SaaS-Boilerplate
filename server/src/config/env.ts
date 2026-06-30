import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

// Load variables from a local `.env` file (if present) into process.env before
// validation. In production, real env vars take precedence — dotenv never
// overwrites an already-set variable. `quiet` suppresses dotenv's startup banner.
loadDotenv({ quiet: true });

/**
 * The single source of truth for runtime configuration.
 *
 * Every environment variable the server consumes is declared, typed, coerced,
 * and given a sensible default here. Validation runs once, at import time, so a
 * misconfigured deploy fails fast and loudly instead of breaking deep inside a
 * request months later.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().positive().default(4000),

  /** PostgreSQL connection string (required). */
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  /** Secret used to sign access-token JWTs. Must be long and random. */
  ACCESS_TOKEN_SECRET: z.string().min(32, 'ACCESS_TOKEN_SECRET must be at least 32 characters'),

  /** Access-token lifetime in seconds (default: 15 minutes). */
  ACCESS_TOKEN_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60),

  /** Refresh-token lifetime in seconds (default: 30 days). */
  REFRESH_TOKEN_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(30 * 24 * 60 * 60),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

  /** Comma-separated list of allowed origins, or `*` to allow all. */
  CORS_ORIGIN: z.string().min(1).default('*'),

  /** Rate-limit window in milliseconds (default: 15 minutes). */
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000),

  /** Max requests allowed per window, per client. */
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),

  /** Public base URL of the client app — used to build links in emails. */
  APP_URL: z.string().min(1).default('http://localhost:5173'),

  /** Default "From" address for outbound email. */
  EMAIL_FROM: z.string().min(1).default('SaaS Boilerplate Pro <no-reply@localhost>'),

  /** Email transport: `console` logs messages (dev); `smtp` actually sends. */
  EMAIL_TRANSPORT: z.enum(['console', 'smtp']).default('console'),

  // SMTP settings — required only when EMAIL_TRANSPORT=smtp (see refine below).
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

const envSchemaWithRefinements = envSchema.superRefine((value, ctx) => {
  if (value.EMAIL_TRANSPORT !== 'smtp') {
    return;
  }
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'] as const;
  for (const key of required) {
    if (value[key] === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: [key],
        message: `${key} is required when EMAIL_TRANSPORT=smtp`,
      });
    }
  }
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchemaWithRefinements.safeParse(process.env);

if (!parsed.success) {
  // The logger depends on validated config, so it isn't available yet — fall
  // back to console and abort. A boot-time misconfiguration must never start.
  console.error('❌ Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.') || '(root)'}: ${issue.message}`);
  }
  process.exit(1);
}

/** Validated, immutable, fully-typed runtime configuration. */
export const env: Readonly<Env> = Object.freeze(parsed.data);
