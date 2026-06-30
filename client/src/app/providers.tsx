import type { JSX, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/lib/query-client';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composition root for all global providers. New cross-cutting providers (theme,
 * auth, etc.) are added here so the wiring lives in one place. Devtools are
 * tree-shaken out of production builds via the `import.meta.env.DEV` guard.
 */
export function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
