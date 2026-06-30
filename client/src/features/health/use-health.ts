import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getHealth, type HealthStatus } from '@/features/health/api';

/** Stable query key for the backend health check. */
export const healthQueryKey = ['health'] as const;

/** React Query hook exposing the backend health status. */
export function useHealth(): UseQueryResult<HealthStatus> {
  return useQuery({
    queryKey: healthQueryKey,
    queryFn: getHealth,
  });
}
