import type { JSX } from 'react';
import { Link, Outlet } from 'react-router';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Application shell.
 *
 * The persistent chrome (header, and later: nav/sidebar/footer) that wraps every
 * routed page rendered through `<Outlet />`.
 */
export function RootLayout(): JSX.Element {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-semibold tracking-tight">
            SaaS Boilerplate Pro
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
              Sign in
            </Link>
            <Link to="/signup" className={cn(buttonVariants({ size: 'sm' }))}>
              Sign up
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
