import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

const SITE_NAME = 'SaaS Boilerplate Pro';

/**
 * Lightweight document-head manager for an SPA: sets the page title and meta
 * description on mount. Renders nothing.
 *
 * NOTE: for crawler-facing SEO (Open Graph, full meta in the initial HTML), this
 * SPA should be paired with prerendering/SSG at build time — runtime updates
 * here only affect the live document, not the served HTML.
 */
export function Seo({ title, description }: SeoProps): null {
  useEffect(() => {
    document.title = `${title} · ${SITE_NAME}`;

    if (description !== undefined) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'description';
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
  }, [title, description]);

  return null;
}
