import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll helper. Attach `ref` to an element; `inView` flips to `true`
 * the first time the element enters the viewport (and stays true). Used to drive
 * CSS scroll-reveal transitions without a third-party animation library.
 */
export function useInView<T extends Element = HTMLDivElement>(
  rootMargin = '0px 0px -10% 0px',
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [inView, rootMargin]);

  return { ref, inView };
}
