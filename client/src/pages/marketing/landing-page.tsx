import type { JSX } from 'react';

import { CtaSection } from '@/components/marketing/cta-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { HeroSection } from '@/components/marketing/hero-section';
import { MarketingFooter } from '@/components/marketing/marketing-footer';
import { MarketingNav } from '@/components/marketing/marketing-nav';
import { PricingSection } from '@/components/marketing/pricing-section';
import { TechStack } from '@/components/marketing/tech-stack';
import { Seo } from '@/components/seo/seo';

import './landing.css';

export default function LandingPage(): JSX.Element {
  return (
    <div className="landing">
      <Seo
        title="Ship your SaaS faster"
        description="A production-grade SaaS boilerplate — auth, teams, RBAC, billing, emails, files, and admin, fully typed and tested. Launch in days, not months."
      />
      <MarketingNav />
      <main>
        <HeroSection />
        <TechStack />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
