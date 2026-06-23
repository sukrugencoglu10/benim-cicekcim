import Link from "next/link";
import { formatPrice, waLink, site } from "@/lib/config";
import { WhatsAppIcon, HeartIcon } from "./Icons";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const hasSale = product.sale_price != null && product.sale_price < product.price;
  const orderMsg = `Merhaba, "${product.name}" ürününü sipariş etmek istiyorum. ${site.url}/urun/${product.id}`;

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-lg bg-cream">
        {(hasSale || product.badge) && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-sale px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
            {product.badge || "İndirim"}
          </span>
        )}

        <Link href={`/urun/${product.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_url}
            alt={product.name}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Aksiyonlar — mobilde her zaman görünür, masaüstünde hover ile açılır */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center justify-center gap-2 p-2.5 opacity-100 transition-all duration-300 sm:p-3 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <a
            href={waLink(orderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-medium text-white shadow-soft transition-transform hover:scale-105 sm:px-4"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Sipariş Ver</span>
          </a>
          <button
            aria-label="İstek listesine ekle"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-colors hover:text-brand sm:inline-flex"
          >
            <HeartIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-center">
        <Link
          href={`/urun/${product.id}`}
          className="text-sm font-medium text-ink transition-colors hover:text-brand"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
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
      </div>
    </div>
  );
}
