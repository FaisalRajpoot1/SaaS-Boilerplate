import type { JSX } from 'react';
import { Link } from 'react-router';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Stack', href: '#stack' },
];

export function MarketingNav(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="landing-mono flex items-center gap-2 text-sm font-semibold">
          <span
            className="grid size-7 place-items-center rounded-md text-[var(--accent-ink)]"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden
          >
            ◳
          </span>
          <span>
            saas<span className="text-[var(--accent)]">/</span>boilerplate
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:block"
          >
            Sign in
          </Link>
          <Link to="/signup" className="landing-btn landing-btn-primary !h-10 !px-4 !text-sm">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
