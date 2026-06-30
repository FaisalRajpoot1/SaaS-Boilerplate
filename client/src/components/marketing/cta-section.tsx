import { ArrowRight } from 'lucide-react';
import type { JSX } from 'react';
import { Link } from 'react-router';

import { Reveal } from '@/components/marketing/reveal';

export function CtaSection(): JSX.Element {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-28">
      <Reveal>
        <div className="landing-card relative overflow-hidden px-8 py-16 text-center md:py-20">
          <div className="landing-glow top-1/2 left-1/2 h-[300px] w-[520px] -translate-x-1/2 -translate-y-1/2" />
          <p className="landing-eyebrow mb-5">Ready when you are</p>
          <h2 className="landing-display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)]">
            Ship your SaaS this week.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--muted)]">
            Stop rebuilding auth and billing for the hundredth time. Start from a foundation
            that&apos;s already production-grade.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup" className="landing-btn landing-btn-primary">
              Start building <ArrowRight size={17} />
            </Link>
            <a href="#pricing" className="landing-btn landing-btn-ghost">
              See pricing
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
