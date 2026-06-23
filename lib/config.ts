// Site genel ayarları — marka, iletişim, menü tek yerden yönetilir.

export const site = {
  name: "Benim Çiçekçim",
  tagline: "Taze çiçekler, kapınıza özenle",
  description:
    "Benim Çiçekçim — taze buketler, aranjmanlar ve özel gün çiçekleri. Aynı gün teslimat ve WhatsApp ile kolay sipariş.",
  url: "https://benimcicekcim.com",
  // Ülke koduyla, sadece rakam (env varsa o kullanılır)
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "905550000000",
  phone: "+90 555 000 0000",
  email: "siparis@benimcicekcim.com",
  address: "Bahar Sokak No:12, Çiçek Mah., İstanbul",
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    pinterest: "#",
    youtube: "#",
  },
};

export const nav = [
  { label: "ANASAYFA", href: "/" },
  { label: "MAĞAZA", href: "/magaza" },
  { label: "ÇİÇEKLER", href: "/#cicekler" },
  { label: "BLOG", href: "/#blog" },
  { label: "İLETİŞİM", href: "/iletisim" },
];

export const categories = [
  { key: "new", label: "YENİ" },
  { key: "featured", label: "ÖNE ÇIKAN" },
  { key: "onsale", label: "İNDİRİMDE" },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];

// WhatsApp sipariş linki üretici
export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Fiyatı TL formatına çevirir
export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
