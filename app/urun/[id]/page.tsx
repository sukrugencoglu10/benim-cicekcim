import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WhatsAppIcon } from "@/components/Icons";
import { getProduct } from "@/lib/products";
import { formatPrice, waLink, site } from "@/lib/config";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: product.name,
    description: product.description ?? site.description,
    openGraph: { images: [product.image_url] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const hasSale =
    product.sale_price != null && product.sale_price < product.price;
  const orderMsg = `Merhaba, "${product.name}" ürününü sipariş etmek istiyorum. ${site.url}/urun/${product.id}`;

  return (
    <>
      <TopBar />
      <Header />
      <main className="container-x py-12">
        <nav className="mb-8 text-xs text-muted">
          <Link href="/" className="hover:text-brand">Anasayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/magaza" className="hover:text-brand">Mağaza</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-4xl font-semibold text-ink">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-2xl">
              {hasSale ? (
                <>
                  <span className="text-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-semibold text-brand">
                    {formatPrice(product.sale_price!)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-brand">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 leading-relaxed text-muted">
                {product.description}
              </p>
            )}

            <a
              href={waLink(orderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp ile Sipariş Ver
            </a>

            <p className="mt-4 text-xs text-muted">
              Siparişiniz WhatsApp üzerinden onaylanır — hızlı ve güvenli.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
