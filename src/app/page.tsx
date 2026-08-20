import HorizonHero from '@/components/ui/horizon-hero-section';
import HouseSection from '@/components/HouseSection';
import SignatureSection from '@/components/SignatureSection';
import WhySection from '@/components/WhySection';
import StorySection from '@/components/StorySection';
import LegacySection from '@/components/LegacySection';
import ProcessSection from '@/components/ProcessSection';
import StoresSection from '@/components/StoresSection';
import Testimonials from '@/components/Testimonials';
import SocialGrid from '@/components/SocialGrid';
import MarketplaceCTA from '@/components/MarketplaceCTA';

/**
 * The homepage reads as one story:
 * Gwalior → the house → product → trust → where it started → six decades of it
 * → how it is made → stores → proof → buy.
 *
 * It opens on the horizon: three screens of scroll that fly the camera through
 * a Gwalior ridge — the house name, then Best Bites, then the range.
 *
 * `HouseSection` then answers the question the horizon leaves behind, which is
 * the first thing anyone asks on a site carrying two names: why are there two?
 * It pins one screen on the parent identity, forks it into Best Namkeen and
 * Best Bites, and gives each of them a face of its own.
 *
 * `StorySection` and `LegacySection` sit together on purpose and in that order:
 * the first is the short card — it started in Gwalior, here is the address,
 * read more — and the second is the telling, six decades of it, delivered a
 * line at a time down a dark screen. Short version, then long version.
 */
export default function HomePage() {
  return (
    <>
      <HorizonHero />
      <HouseSection />
      <SignatureSection />
      <WhySection />
      <StorySection />
      <LegacySection />
      <ProcessSection />
      <StoresSection />
      <Testimonials />
      <SocialGrid />
      <MarketplaceCTA />
    </>
  );
}
