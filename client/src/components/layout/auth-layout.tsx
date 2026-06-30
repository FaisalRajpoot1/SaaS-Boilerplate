import type { JSX } from 'react';
import { Link, Outlet } from 'react-router';

/**
 * Layout for unauthenticated pages (login, signup, password reset).
 *
 * Deliberately minimal — no app header/nav — to keep focus on the auth form.
 */
export function AuthLayout(): JSX.Element {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Link to="/" className="text-lg font-semibold tracking-tight">
        SaaS Boilerplate Pro
      </Link>
      <Outlet />
    </div>
  );
}
