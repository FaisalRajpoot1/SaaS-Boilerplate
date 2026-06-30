import type { JSX } from 'react';

import { useHealth } from '@/features/health/use-health';

export default function HomePage(): JSX.Element {
  const { data, isPending, isError, error } = useHealth();

  return (
    <div className="bg-card text-card-foreground mx-auto w-full max-w-md rounded-xl border p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome 👋</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        The client foundation is running: React Router, the app shell, design tokens, dark mode, and
        the TanStack Query data layer are all wired up.
      </p>

      <div className="bg-muted/40 mt-6 rounded-lg border p-4">
        <p className="text-sm font-medium">Backend connectivity</p>
        {isPending ? (
          <p className="text-muted-foreground mt-1 text-sm">Checking…</p>
        ) : isError ? (
          <p className="text-destructive mt-1 text-sm">
            Unreachable: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        ) : (
          <p className="mt-1 text-sm">
            <span className="font-medium text-green-600 dark:text-green-400">● {data.status}</span>{' '}
            <span className="text-muted-foreground">
              · uptime {Math.round(data.uptime)}s
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
