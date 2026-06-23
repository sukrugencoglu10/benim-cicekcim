import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import AdSlot from "@/components/AdSlot";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Mağaza",
  description: "Taze buketler, aranjmanlar ve özel gün çiçekleri.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <TopBar />
      <Header />
      <main className="container-x py-12">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink">Mağaza</h1>
          <p className="mx-auto mt-2 h-[2px] w-10 bg-brand" />
          <p className="mt-4 text-sm text-muted">
            Tüm çiçek koleksiyonumuzu keşfedin.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Henüz ürün eklenmemiş.</p>
        )}

        <AdSlot className="mt-12" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
