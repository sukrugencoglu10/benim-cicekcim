import Link from "next/link";
import { site } from "@/lib/config";
import Newsletter from "./Newsletter";
import { PinIcon, PhoneIcon, MailIcon } from "./Icons";

const colKurumsal = ["Hakkımızda", "Gizlilik Politikası", "Şartlar & Koşullar", "Çok Satanlar", "Üreticiler"];
const colTeslimat = ["Teslimat Bilgisi", "İade Politikası", "Şartlar & Koşullar", "Arama", "Sipariş & İade"];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-cream">
      <div className="container-x grid grid-cols-1 gap-10 py-14 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
        {/* Marka + iletişim */}
        <div>
          <span className="font-serif text-2xl font-semibold text-ink">{site.name}</span>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex items-start justify-center gap-2 md:justify-start">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {site.address}
            </li>
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <PhoneIcon className="h-4 w-4 shrink-0 text-brand" /> {site.phone}
            </li>
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <MailIcon className="h-4 w-4 shrink-0 text-brand" /> {site.email}
            </li>
          </ul>
        </div>

        {/* Kurumsal + Teslimat — mobilde yan yana ortalı, masaüstünde ayrı kolonlar */}
        <div className="grid grid-cols-2 gap-6 text-center lg:contents lg:text-left">
          <FooterCol title="Kurumsal" items={colKurumsal} />
          <FooterCol title="Teslimat" items={colTeslimat} />
        </div>

        {/* Bülten */}
        <div>
          <Newsletter />
          <div className="mt-5 flex justify-center gap-2 md:justify-start">
            {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
              <span
                key={p}
                className="rounded border border-line bg-white px-2.5 py-1 text-[10px] font-semibold text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} — Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/iletisim" className="hover:text-brand">Gizlilik & Çerezler</Link>
            <Link href="/iletisim" className="hover:text-brand">Erişilebilirlik</Link>
            <Link href="/iletisim" className="hover:text-brand">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-ink">{title}</h4>
      <ul className="mt-5 space-y-2.5 text-sm text-muted">
        {items.map((i) => (
          <li key={i}>
            <Link href="/iletisim" className="transition-colors hover:text-brand">
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
