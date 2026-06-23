"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "./Icons";
import { formatPrice } from "@/lib/config";
import type { Product } from "@/lib/types";

const lower = (s: string) => s.toLocaleLowerCase("tr");

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ürünleri ilk açılışta bir kez çek
  useEffect(() => {
    if (open && !loaded) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((d: Product[]) => setProducts(d))
        .catch(() => {})
        .finally(() => setLoaded(true));
    }
  }, [open, loaded]);

  // Açılınca odaklan
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = lower(query.trim());
  const results = q
    ? products
        .filter(
          (p) =>
            lower(p.name).includes(q) ||
            (p.description ? lower(p.description).includes(q) : false)
        )
        .slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50">
      {/* Arka plan */}
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel (üstte) */}
      <div className="relative w-full animate-fade-up bg-white shadow-soft">
        <div className="container-x py-4">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <SearchIcon className="h-5 w-5 shrink-0 text-brand" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Çiçek ara... (ör. gül, lale, buket)"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
            <button
              onClick={onClose}
              aria-label="Aramayı kapat"
              className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-brand"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Sonuçlar */}
          <div className="max-h-[60vh] overflow-auto py-2">
            {!q && (
              <p className="py-6 text-center text-sm text-muted">
                Aramak için bir çiçek adı yazın.
              </p>
            )}
            {q && results.length === 0 && (
              <p className="py-6 text-center text-sm text-muted">
                “{query}” için sonuç bulunamadı.
              </p>
            )}
            <ul className="divide-y divide-line">
              {results.map((p) => {
                const price = p.sale_price ?? p.price;
                return (
                  <li key={p.id}>
                    <Link
                      href={`/urun/${p.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-cream"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-12 w-12 shrink-0 rounded object-cover"
                      />
                      <span className="flex-1 text-sm text-ink">{p.name}</span>
                      <span className="text-sm font-semibold text-brand">
                        {formatPrice(price)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
