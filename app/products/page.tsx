import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AllProductsContent from "@/components/AllProductsContent";

export const metadata: Metadata = {
  title: "All Products — Best Namkeen",
  description:
    "Explore the full Best Namkeen range — Ratlami Sev, Sada Sev, Kadipatta Mix, Indori Khatta Meetha, Milan Mixture, Ujjaini Sev, Lahsun Mix and Waffer Mix. 400g fresh-sealed packs from Gwalior.",
};

export default function ProductsPage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <AllProductsContent />
      <Footer />
    </>
  );
}
