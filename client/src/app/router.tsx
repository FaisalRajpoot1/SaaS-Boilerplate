import { createBrowserRouter } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';
import { RootLayout } from '@/components/layout/root-layout';

/**
 * Application route tree.
 *
 * The root route renders the app shell and owns the error boundary, so any error
 * in a child route is caught with consistent UI. Page components are lazily
 * imported so each route is its own code-split chunk. The `*` catch-all renders
 * the 404 page (a matched route, distinct from a thrown error).
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@/pages/home/home-page');
          return { Component };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { default: Component } = await import('@/pages/not-found/not-found-page');
          return { Component };
        },
      },
    ],
  },
]);
