import {
  BarChart3,
  Bell,
  CreditCard,
  KeyRound,
  ScrollText,
  ShieldCheck,
  UploadCloud,
  Users,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import type { JSX } from 'react';

import { Reveal } from '@/components/marketing/reveal';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: KeyRound,
    title: 'Authentication',
    description:
      'Email/password, JWT access + rotating refresh tokens, sessions, verification & reset.',
  },
  {
    icon: ShieldCheck,
    title: 'RBAC & permissions',
    description: 'Roles, granular permissions, and route guards — multi-tenant aware from day one.',
  },
  {
    icon: Users,
    title: 'Teams & orgs',
    description:
      'Organizations, members, invitations, and per-org scoping baked into the data model.',
  },
  {
    icon: CreditCard,
    title: 'Billing',
    description:
      'Subscriptions, plans, and usage — a clean abstraction ready for your payment provider.',
  },
  {
    icon: Bell,
    title: 'Notifications & email',
    description: 'Transactional email behind a swappable interface, plus in-app notifications.',
  },
  {
    icon: UploadCloud,
    title: 'File uploads',
    description: 'Secure, validated uploads with a storage adapter you can point anywhere.',
  },
  {
    icon: BarChart3,
    title: 'Admin & analytics',
    description: 'An admin surface and analytics hooks to understand and operate your product.',
  },
  {
    icon: Webhook,
    title: 'API & webhooks',
    description: 'Versioned REST API, rate limiting, and webhook scaffolding for integrations.',
  },
  {
    icon: ScrollText,
    title: 'Audit logs',
    description: 'Immutable, queryable trail of who did what — a must for B2B and compliance.',
  },
];

export function FeaturesSection(): JSX.Element {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <p className="landing-eyebrow mb-4">01 / What&apos;s inside</p>
        <h2 className="landing-display text-[clamp(2rem,4vw,3.1rem)]">
          Everything wired. Nothing wasted.
        </h2>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Twenty production modules, each generic and reusable — no business logic tied to one
          product. Delete what you don&apos;t need; extend the rest.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delayMs={(index % 3) * 80}>
              <article className="group h-full bg-[var(--ink)] p-7 transition-colors hover:bg-[var(--ink-2)]">
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-10 place-items-center rounded-lg border border-[var(--line-2)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]"
                    aria-hidden
                  >
                    <Icon size={19} />
                  </span>
                  <span className="landing-mono text-xs text-[var(--muted-2)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{feature.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
