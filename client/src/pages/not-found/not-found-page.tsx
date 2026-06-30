import type { JSX } from 'react';
import { Link } from 'react-router';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="max-w-md">
        <p className="text-primary text-sm font-semibold">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
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
