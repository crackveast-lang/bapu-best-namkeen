import HorizonHero from '@/components/ui/horizon-hero-section';
import Hero from '@/components/Hero';
import BrandsSection from '@/components/BrandsSection';
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
 * Gwalior → brand → product → trust → story → craft → stores → proof → buy.
 *
 * It opens on the horizon: three screens of scroll that fly the camera through
 * a Gwalior ridge — the house name, then Best Bites, then the range — before
 * the shelf itself arrives in `Hero`.
 */
export default function HomePage() {
  return (
    <>
      <HorizonHero />
      <Hero />
      <BrandsSection />
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
