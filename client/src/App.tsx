import { useState, type JSX } from 'react';

import { cn } from '@/lib/utils';

export default function App(): JSX.Element {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (): void => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 text-card-foreground shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">SaaS Boilerplate Pro</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tailwind v4 and the design-token system are wired up.
        </p>
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            'mt-6 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium',
            'bg-primary text-primary-foreground transition-opacity hover:opacity-90',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
          )}
        >
          {isDark ? '☀ Switch to light' : '🌙 Switch to dark'}
        </button>
      </div>
    </main>
  );
}
