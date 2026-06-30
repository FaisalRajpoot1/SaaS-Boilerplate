import type { JSX, ReactNode } from 'react';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delayMs?: number;
}

/** Wraps content in a scroll-triggered fade/rise reveal. */
export function Reveal({ children, className, delayMs = 0 }: RevealProps): JSX.Element {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
