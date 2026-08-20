import HorizonHero from '@/components/ui/horizon-hero-section';
import HouseSection from '@/components/HouseSection';
import SignatureSection from '@/components/SignatureSection';
import WhySection from '@/components/WhySection';
import StorySection from '@/components/StorySection';
import ProcessSection from '@/components/ProcessSection';
import StoresSection from '@/components/StoresSection';
import Testimonials from '@/components/Testimonials';
import SocialGrid from '@/components/SocialGrid';
import MarketplaceCTA from '@/components/MarketplaceCTA';

/**
 * The homepage reads as one story:
 * Gwalior → the house → product → trust → story → craft → stores → proof → buy.
 *
 * It opens on the horizon: three screens of scroll that fly the camera through
 * a Gwalior ridge — the house name, then Best Bites, then the range.
 *
 * `HouseSection` then answers the question the horizon leaves behind, which is
 * the first thing anyone asks on a site carrying two names: why are there two?
 * It pins one screen on the parent identity, forks it into Best Namkeen and
 * Best Bites, gives each of them a face of its own, and closes with the way in.
 */
export default function HomePage() {
  return (
    <>
      <HorizonHero />
      <HouseSection />
      <SignatureSection />
      <WhySection />
      <StorySection />
      <ProcessSection />
      <StoresSection />
      <Testimonials />
      <SocialGrid />
      <MarketplaceCTA />
    </>
  );
}
