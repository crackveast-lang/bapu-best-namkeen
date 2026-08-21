import HorizonHero from '@/components/ui/horizon-hero-section';
import HouseSection from '@/components/HouseSection';
import StoresSection from '@/components/StoresSection';
import SignatureSection from '@/components/SignatureSection';
import LegacySection from '@/components/LegacySection';
import WhySection from '@/components/WhySection';
import ProcessSection from '@/components/ProcessSection';
import Testimonials from '@/components/Testimonials';
import SocialGrid from '@/components/SocialGrid';
import MarketplaceCTA from '@/components/MarketplaceCTA';

/**
 * The homepage, in the order a visitor actually needs it:
 *
 *   1. the horizon      — who this is, over three screens of scroll
 *   2. the house        — why there are two names, and what each one is for
 *   3. the shops        — where to walk in, because most of Gwalior will
 *   4. the best sellers — what to reach for
 *   5. the story        — six decades of it, once they care
 *   6. the rest         — why it tastes like it does, how it is made, proof, buy
 *
 * Stores sit that high on purpose. This is a sixty-year-old counter business in
 * one city; for a large share of the people who land here the useful answer is
 * an address and a pair of opening hours, not a brand film. The story is the
 * reward for scrolling past it, not the toll for reaching it.
 */
export default function HomePage() {
  return (
    <>
      <HorizonHero />
      <HouseSection />
      <StoresSection />
      <SignatureSection />
      <LegacySection />
      <WhySection />
      <ProcessSection />
      <Testimonials />
      <SocialGrid />
      <MarketplaceCTA />
    </>
  );
}
