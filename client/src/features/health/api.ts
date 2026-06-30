import { httpClient } from '@/lib/api/http-client';

/** Shape of the backend `GET /health` response. */
export interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

/** Fetch the backend health snapshot. */
export function getHealth(): Promise<HealthStatus> {
  return httpClient.get<HealthStatus>('/health');
}
