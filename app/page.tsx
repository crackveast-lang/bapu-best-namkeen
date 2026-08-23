import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CinematicReel from "@/components/CinematicReel";
import ProductShowcase from "@/components/ProductShowcase";
import Combos from "@/components/Combos";
import FloatingComposition from "@/components/FloatingComposition";
import WhyUs from "@/components/WhyUs";
import StoryCinema from "@/components/StoryCinema";
import Founder from "@/components/Founder";
import ChaiTime from "@/components/ChaiTime";
import ZomatoSection from "@/components/ZomatoSection";
import Stores from "@/components/Stores";
import InstagramGrid from "@/components/InstagramGrid";
import Marketplace from "@/components/Marketplace";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        {/* discover */}
        <Hero />
        <Marquee />
        {/* taste */}
        <CinematicReel />
        <ProductShowcase />
        <Combos />
        <FloatingComposition />
        <WhyUs />
        {/* learn */}
        <StoryCinema />
        <Founder />
        <ChaiTime />
        {/* order now */}
        <ZomatoSection />
        {/* visit */}
        <Stores />
        {/* connect */}
        <InstagramGrid />
        {/* buy */}
        <Marketplace />
      </main>
      <Footer />
    </>
  );
}
