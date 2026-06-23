import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import FeatureBar from "@/components/FeatureBar";
import BlogSection from "@/components/BlogSection";
import BrandStrip from "@/components/BrandStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdSlot from "@/components/AdSlot";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <ProductTabs products={products} />
        <AdSlot className="my-2" />
        <FeatureBar />
        <BlogSection />
        <BrandStrip />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
