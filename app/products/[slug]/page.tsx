import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductPageContent from "@/components/ProductPageContent";
import { products, getProduct, relatedProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Best Namkeen`,
    description: `${p.tagline} ${p.desc} ${p.weight} pack — order on Zomato or visit our Gwalior stores.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <ProductPageContent product={product} related={relatedProducts(slug)} />
      <Footer />
    </>
  );
}
