import type { JSX } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

/**
 * Route-level error boundary.
 *
 * Wired as the root route's `errorElement`, so any error thrown while rendering
 * or loading a routed page is caught here and shown with a consistent UI instead
 * of a blank screen. Route responses (thrown `Response`s) and ordinary `Error`s
 * are handled distinctly.
 */
export function RouteErrorBoundary(): JSX.Element {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again.';

  if (isRouteErrorResponse(error)) {
    title = `${String(error.status)} ${error.statusText}`;
    message = typeof error.data === 'string' ? error.data : message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{message}</p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground mt-6 inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
