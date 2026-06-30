import { createBrowserRouter } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';
import { AuthLayout } from '@/components/layout/auth-layout';
import { RootLayout } from '@/components/layout/root-layout';

/**
 * Application route tree.
 *
 * Two layout branches: an unauthenticated branch (`AuthLayout`, no app chrome)
 * for login/signup/reset, and the main app branch (`RootLayout`) which owns the
 * error boundary and 404 catch-all. Page components are lazily imported so each
 * route is its own code-split chunk.
 */
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/login',
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/login-page');
          return { Component };
        },
      },
      {
        path: '/signup',
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/signup-page');
          return { Component };
        },
      },
      {
        path: '/forgot-password',
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/forgot-password-page');
          return { Component };
        },
      },
    ],
  },
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
