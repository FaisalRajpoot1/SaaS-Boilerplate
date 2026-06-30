import { Check } from 'lucide-react';
import type { JSX } from 'react';
import { Link } from 'react-router';

import { Reveal } from '@/components/marketing/reveal';
import { cn } from '@/lib/utils';

interface Tier {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Indie',
    price: '$149',
    cadence: 'one-time',
    blurb: 'For solo builders shipping their first product.',
    features: [
      'Full source code',
      '1 project',
      'All 20 modules',
      'Community support',
      'Lifetime updates',
    ],
    cta: 'Get Indie',
  },
  {
    name: 'Studio',
    price: '$399',
    cadence: 'one-time',
    blurb: 'For freelancers and small teams shipping for clients.',
    features: [
      'Everything in Indie',
      'Unlimited projects',
      'Priority support',
      'Private Discord',
      'CI/CD templates',
    ],
    cta: 'Get Studio',
    featured: true,
  },
  {
    name: 'Agency',
    price: '$999',
    cadence: 'one-time',
    blurb: 'For agencies standardizing every client build.',
    features: [
      'Everything in Studio',
      'Unlimited seats',
      'White-label license',
      'Onboarding call',
      'Roadmap input',
    ],
    cta: 'Get Agency',
  },
];

export function PricingSection(): JSX.Element {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="landing-eyebrow mb-4">02 / Licensing</p>
        <h2 className="landing-display text-[clamp(2rem,4vw,3.1rem)]">Pay once. Ship forever.</h2>
        <p className="mt-4 text-lg text-[var(--muted)]">
          No subscriptions, no per-seat tax on your own product. Buy the license, own the code.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier, index) => (
          <Reveal key={tier.name} delayMs={index * 90}>
            <div
              className={cn(
                'landing-card relative flex h-full flex-col p-7',
                tier.featured && 'ring-1 ring-[var(--accent)]',
              )}
            >
              {tier.featured ? (
                <span className="landing-mono absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-[0.65rem] font-semibold tracking-wider text-[var(--accent-ink)] uppercase">
                  Most popular
                </span>
              ) : null}

              <h3 className="landing-mono text-sm tracking-wider text-[var(--muted)] uppercase">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="landing-display text-5xl">{tier.price}</span>
                <span className="text-sm text-[var(--muted-2)]">/ {tier.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{tier.blurb}</p>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    <span className="text-[var(--fg)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={cn(
                  'landing-btn mt-8 w-full',
                  tier.featured ? 'landing-btn-primary' : 'landing-btn-ghost',
                )}
              >
                {tier.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
