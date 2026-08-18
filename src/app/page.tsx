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
 */
export default function HomePage() {
  return (
    <>
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
