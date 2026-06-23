"use client";

import { useMemo, useState } from "react";
import { categories } from "@/lib/config";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductTabs({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>(categories[0].key);

  const visible = useMemo(
    () => products.filter((p) => p.category === active).slice(0, 8),
    [products, active]
  );

  return (
    <section id="cicekler" className="container-x scroll-mt-24 py-12">
      {/* Sekme başlıkları */}
      <div className="mb-8 flex items-center justify-center gap-6">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`relative pb-1 text-sm font-medium uppercase tracking-wider transition-colors ${
              active === c.key ? "text-brand" : "text-muted hover:text-ink"
            }`}
          >
            {c.label}
            {active === c.key && (
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-brand" />
            )}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Bu kategoride henüz ürün yok.</p>
      )}
    </section>
  );
}
