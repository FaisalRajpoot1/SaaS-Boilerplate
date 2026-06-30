/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL for the backend API. Empty string ('') means same-origin (the
   * default; dev requests are proxied by Vite). Set to a full origin
   * (e.g. https://api.example.com) for cross-origin deployments.
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
