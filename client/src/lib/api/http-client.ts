import { env } from '@/config/env';

/** Error envelope returned by the backend (mirrors the server's error handler). */
interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Error thrown for any non-2xx API response. Carries the HTTP status plus the
 * server's stable `code`/`message` so UI and React Query can react precisely.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof (value as { error: unknown }).error === 'object'
  );
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      ...init,
    });
  } catch (cause) {
    // Network-level failure (offline, DNS, CORS, server down).
    throw new ApiError(0, 'NETWORK_ERROR', 'Unable to reach the server.', cause);
  }

  const isJson = response.headers.get('content-type')?.includes('application/json') ?? false;
  const body: unknown = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isApiErrorBody(body)) {
      throw new ApiError(response.status, body.error.code, body.error.message, body.error.details);
    }
    throw new ApiError(response.status, 'HTTP_ERROR', `Request failed (${String(response.status)})`);
  }

  return body as T;
}

/**
 * Minimal typed HTTP client. All app data access goes through these helpers so
 * error handling, base URL, and headers stay consistent in one place.
 */
export const httpClient = {
  get: <T>(path: string, init?: RequestInit): Promise<T> =>
    request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body?: unknown, init?: RequestInit): Promise<T> =>
    request<T>(path, { ...init, method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown, init?: RequestInit): Promise<T> =>
    request<T>(path, { ...init, method: 'PUT', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit): Promise<T> =>
    request<T>(path, { ...init, method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string, init?: RequestInit): Promise<T> =>
    request<T>(path, { ...init, method: 'DELETE' }),
};
