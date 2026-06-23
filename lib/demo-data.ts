import type { Product } from "./types";
import type { CategoryKey } from "./config";

// Supabase yapılandırılmadığında site bu demo verilerle çalışır,
// böylece tasarım anında görülebilir. Görseller serbest lisanslı (Unsplash).
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const images = [
  "photo-1490750967868-88aa4486c946",
  "photo-1487070183336-b863922373d4",
  "photo-1563241527-3004b7be0ffd",
  "photo-1561181286-d3fee7d55364",
  "photo-1519378058457-4c29a0a2efac",
  "photo-1468327768560-75b778cbb551",
  "photo-1455659817273-f96807779a8a",
  "photo-1520763185298-1b434c919102",
  "photo-1487530811176-3780de880c2d",
];

type Seed = { name: string; price: number; sale?: number };

// Her kategoride 8 ürün → anasayfada 4'lü 2 satır (toplam 8) görünür.
const seeds: Record<CategoryKey, Seed[]> = {
  new: [
    { name: "Vazo Günbatımı", price: 860, sale: 830 },
    { name: "Neşeli Vazo", price: 880, sale: 860 },
    { name: "Beyaz Zarafet", price: 720 },
    { name: "Pembe Rüya", price: 640 },
    { name: "Papatya Bahçesi", price: 560 },
    { name: "Lavanta Düşü", price: 540 },
    { name: "Güneşli Bahar", price: 690 },
    { name: "Orkide Düşü", price: 910 },
  ],
  featured: [
    { name: "Bahar Esintisi", price: 690 },
    { name: "Kırmızı Tutku", price: 950, sale: 890 },
    { name: "Romantik Pembe", price: 780 },
    { name: "Zarif Lilyum", price: 720 },
    { name: "Gül Bahçesi", price: 840 },
    { name: "Sevgi Buketi", price: 760 },
    { name: "Pastel Uyum", price: 600 },
    { name: "Düğün Buketi", price: 1050 },
  ],
  onsale: [
    { name: "Anı Aranjmanı", price: 780, sale: 720 },
    { name: "Mor Bahar Vazosu", price: 480, sale: 420 },
    { name: "Sonbahar Tonları", price: 640, sale: 560 },
    { name: "Renk Cümbüşü", price: 720, sale: 650 },
    { name: "Kır Çiçekleri", price: 520, sale: 460 },
    { name: "Sade Şıklık", price: 700, sale: 610 },
    { name: "Teşekkür Buketi", price: 760, sale: 680 },
    { name: "Doğum Günü Sürprizi", price: 880, sale: 790 },
  ],
};

function build(): Product[] {
  const out: Product[] = [];
  let imgIndex = 0;
  (Object.keys(seeds) as CategoryKey[]).forEach((cat) => {
    seeds[cat].forEach((s, i) => {
      out.push({
        id: `demo-${cat}-${i + 1}`,
        name: s.name,
        description: "Özenle hazırlanan taze çiçek aranjmanı.",
        price: s.price,
        sale_price: s.sale ?? null,
        category: cat,
        badge: s.sale ? "İndirim" : null,
        image_url: img(images[imgIndex++ % images.length]),
      });
    });
  });
  return out;
}

export const demoProducts: Product[] = build();
