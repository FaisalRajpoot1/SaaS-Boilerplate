import type { JSX } from 'react';
import { Link } from 'react-router';

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Stack', href: '#stack' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'GitHub', href: 'https://github.com/FaisalRajpoot1/SaaS-Boilerplate' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'License', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

export function MarketingFooter(): JSX.Element {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="landing-mono flex items-center gap-2 text-sm font-semibold">
            <span
              className="grid size-7 place-items-center rounded-md text-[var(--accent-ink)]"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden
            >
              ◳
            </span>
            saas<span className="text-[var(--accent)]">/</span>boilerplate
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[var(--muted)]">
            The production-grade foundation for your next SaaS. Built to be reused across every
            product you ship.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading}>
            <p className="landing-mono mb-4 text-xs tracking-wider text-[var(--muted-2)] uppercase">
              {column.heading}
            </p>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="landing-mono mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-[var(--muted-2)] sm:flex-row">
          <span>© 2026 SaaS Boilerplate Pro. All rights reserved.</span>
          <span>Designed &amp; built for builders.</span>
        </div>
      </div>
    </footer>
  );
}
