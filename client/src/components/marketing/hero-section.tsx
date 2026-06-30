import { ArrowRight } from 'lucide-react';
import type { JSX } from 'react';
import { Link } from 'react-router';

/** Inline GitHub mark (lucide v1 dropped brand icons). */
function GithubMark(): JSX.Element {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}

const STACK_TAGS = ['TypeScript', 'React 19', 'Express', 'Prisma', 'PostgreSQL'];

const TERMINAL_LINES: { prompt: boolean; text: string; accent?: boolean }[] = [
  { prompt: true, text: 'npx create-saas-app my-startup' },
  { prompt: false, text: '◳ scaffolding client + server…' },
  { prompt: false, text: '✓ auth · rbac · billing · email' },
  { prompt: false, text: '✓ prisma schema + migrations' },
  { prompt: false, text: 'Ready in 9.2s', accent: true },
];

export function HeroSection(): JSX.Element {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="landing-glow top-[-60px] left-1/2 h-[420px] w-[680px] -translate-x-1/2" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div>
          <p
            className="landing-eyebrow landing-enter mb-6 flex items-center gap-3"
            style={{ animationDelay: '0ms' }}
          >
            <span className="inline-block h-px w-8 bg-[var(--accent)]" />
            Production-grade SaaS starter
          </p>

          <h1
            className="landing-display landing-enter text-[clamp(2.6rem,6vw,4.6rem)]"
            style={{ animationDelay: '80ms' }}
          >
            Launch your SaaS
            <br />
            on a <span className="text-[var(--accent)]">solid</span> foundation.
          </h1>

          <p
            className="landing-enter mt-6 max-w-xl text-lg text-[var(--muted)]"
            style={{ animationDelay: '160ms' }}
          >
            Auth, teams, RBAC, billing, emails, files, and an admin panel — wired, typed, and
            tested. Skip three months of plumbing and ship the product that actually matters.
          </p>

          <div
            className="landing-enter mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Link to="/signup" className="landing-btn landing-btn-primary">
              Start building <ArrowRight size={17} />
            </Link>
            <a
              href="https://github.com/FaisalRajpoot1/SaaS-Boilerplate"
              target="_blank"
              rel="noreferrer"
              className="landing-btn landing-btn-ghost"
            >
              <GithubMark /> View source
            </a>
          </div>

          <div
            className="landing-enter landing-mono mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted-2)]"
            style={{ animationDelay: '320ms' }}
          >
            {STACK_TAGS.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <span className="text-[var(--accent)]">▸</span> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Blueprint terminal visual */}
        <div
          className="landing-enter landing-ticks landing-card p-1.5"
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="landing-mono ml-2 text-xs text-[var(--muted-2)]">~/my-startup</span>
          </div>
          <div className="landing-mono space-y-2 px-5 py-6 text-sm leading-relaxed">
            {TERMINAL_LINES.map((line, index) => (
              <div
                key={index}
                className={line.accent ? 'text-[var(--accent)]' : 'text-[var(--fg)]'}
              >
                {line.prompt ? <span className="text-[var(--accent)]">$ </span> : null}
                {!line.prompt && !line.accent ? (
                  <span className="text-[var(--muted-2)]">{'  '}</span>
                ) : null}
                {line.text}
              </div>
            ))}
            <div className="text-[var(--muted-2)]">
              $ <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[var(--accent)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
