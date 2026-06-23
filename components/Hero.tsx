import Link from "next/link";

const img = (id: string, w = 1900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Tüm hero alanını kaplayan görsel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img("photo-1563241527-3004b7be0ffd")}
        alt="Düğün buketi"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        fetchPriority="high"
      />

      {/* Açık degrade örtü — metnin okunması için (koyu ton yok) */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent lg:bg-gradient-to-r" />

      {/* İçerik */}
      <div className="container-x relative z-10 flex min-h-[460px] items-end justify-center pb-12 text-center sm:min-h-[520px] lg:min-h-[620px] lg:items-center lg:justify-start lg:pb-0 lg:text-left">
        <div className="max-w-lg animate-fade-up">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brand">
            Taze &amp; El Yapımı Buketler
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Sevdiklerinize
            <br className="hidden sm:block" /> Çiçekle Dokunun
          </h1>

          {/* Çiçek ikonlu ince ayraç */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-12 bg-brand/50" />
            <FlowerMark className="h-5 w-5 text-brand" />
            <span className="h-px w-12 bg-brand/50" />
          </div>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted lg:mx-0">
            Mevsimin en taze çiçekleriyle özenle hazırlanan buketler,
            <span className="font-medium text-ink"> aynı gün kapınızda</span>.
            Mutluluğu bugün gönderin.
          </p>

          <Link href="/magaza" className="btn-brand mt-8">
            Hemen Sipariş Ver
          </Link>
        </div>
      </div>
    </section>
  );
}

// Basit, zarif çiçek işareti (ayraç ortası için)
function FlowerMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="6" rx="2" ry="3.2" />
      <ellipse cx="12" cy="18" rx="2" ry="3.2" />
      <ellipse cx="6" cy="12" rx="3.2" ry="2" />
      <ellipse cx="18" cy="12" rx="3.2" ry="2" />
    </svg>
  );
}
