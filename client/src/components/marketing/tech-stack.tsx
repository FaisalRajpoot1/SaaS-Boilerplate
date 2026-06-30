import type { JSX } from 'react';

const STACK = [
  'React 19',
  'Vite',
  'TypeScript',
  'Tailwind v4',
  'Express',
  'Prisma',
  'PostgreSQL',
  'TanStack Query',
  'Zod',
  'argon2',
  'JWT',
  'Vitest',
];

export function TechStack(): JSX.Element {
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const items = [...STACK, ...STACK];

  return (
    <section id="stack" className="border-y border-[var(--line)] py-10">
      <p className="landing-eyebrow mb-7 text-center">Built on a foundation you trust</p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="landing-marquee-track gap-10">
          {items.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="landing-mono flex items-center gap-10 text-lg whitespace-nowrap text-[var(--muted)]"
            >
              {name}
              <span className="text-[var(--accent)]">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
