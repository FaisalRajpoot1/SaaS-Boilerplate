import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/lib/api/http-client';

/**
 * Shared React Query client.
 *
 * Defaults tuned for a SaaS app: a short stale time to avoid redundant refetches
 * on quick remounts, and a retry policy that does NOT retry on 4xx client errors
 * (e.g. 401/404) — retrying those wastes requests and delays error UI.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});
