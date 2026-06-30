/**
 * Typed, centralized access to client runtime configuration.
 *
 * Vite statically replaces `import.meta.env.VITE_*` at build time, so there is
 * no runtime `process.env`. Reading every value through this module keeps env
 * access typed and gives us one place to apply defaults.
 */
export const env = {
  /** API origin prefix; '' = same-origin (dev proxied by Vite). */
  apiUrl: import.meta.env.VITE_API_URL ?? '',
} as const;
