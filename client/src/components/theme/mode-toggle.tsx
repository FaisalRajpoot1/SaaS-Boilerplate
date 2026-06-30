import { useState, type JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Light/dark theme toggle.
 *
 * Toggles the `dark` class on <html>, which flips every design token. This is a
 * minimal implementation — persistence (localStorage), system-preference
 * detection, and no-flash handling are added with a dedicated ThemeProvider in a
 * later task.
 */
export function ModeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState(false);

  const toggle = (): void => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center',
        'rounded-md border px-3 text-sm font-medium transition-colors',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
      )}
    >
      {isDark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}
