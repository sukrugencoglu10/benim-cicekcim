"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/config";
import { SearchIcon } from "./Icons";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        {/* Mobil menü butonu */}
        <button
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink lg:hidden"
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </span>
        </button>

        {/* Sol menü (masaüstü) */}
        <nav className="hidden flex-1 items-center gap-7 lg:flex">
          {nav.slice(0, 3).map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo (ortada) */}
        <Link href="/" className="flex flex-col items-center leading-none">
          <span className="font-serif text-3xl font-semibold tracking-tight text-ink">
            {site.name}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-brand">
            Çiçekçi
          </span>
        </Link>

        {/* Sağ menü (masaüstü) */}
        <nav className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          {nav.slice(3).map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
          <button
            aria-label="Ara"
            onClick={() => setSearchOpen(true)}
            className="text-ink transition-colors hover:text-brand"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </nav>

        {/* Sağ arama (mobil) */}
        <button
          aria-label="Ara"
          onClick={() => setSearchOpen(true)}
          className="text-ink transition-colors hover:text-brand lg:hidden"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Arama paneli (mobil + web) */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobil açılır menü */}
      {open && (
        <nav className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="nav-link py-3"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
