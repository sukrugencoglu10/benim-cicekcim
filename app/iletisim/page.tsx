import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PinIcon, PhoneIcon, MailIcon, WhatsAppIcon } from "@/components/Icons";
import { site, waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bize ulaşın — Benim Çiçekçim iletişim bilgileri.",
};

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="container-x py-14">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-semibold text-ink">İletişim</h1>
          <p className="mx-auto mt-3 h-[2px] w-10 bg-brand" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* İletişim bilgileri */}
          <div className="flex flex-col gap-4">
            <InfoRow
              icon={<PinIcon className="h-5 w-5 text-brand" />}
              title="Adres"
              value={site.address}
            />
            <InfoRow
              icon={<PhoneIcon className="h-5 w-5 text-brand" />}
              title="Telefon"
              value={site.phone}
            />
            <InfoRow
              icon={<MailIcon className="h-5 w-5 text-brand" />}
              title="E-posta"
              value={site.email}
            />

            <a
              href={waLink("Merhaba, bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp ile Yazın
            </a>

            {/* Çalışma saatleri */}
            <div className="mt-2 rounded-lg border border-line bg-cream p-5 text-sm text-muted">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink">
                Çalışma Saatleri
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>Pazartesi – Cuma</span>
                  <span className="font-medium text-ink">08:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span className="font-medium text-ink">09:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span className="font-medium text-ink">10:00 – 16:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Harita */}
          <div className="overflow-hidden rounded-xl border border-line shadow-soft">
            <iframe
              title="Benim Çiçekçim Konumu"
              src="https://www.openstreetmap.org/export/embed.html?bbox=28.95%2C41.00%2C28.97%2C41.02&layer=mapnik&marker=41.01%2C28.96"
              width="100%"
              height="100%"
              className="min-h-[420px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-line bg-white p-5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{value}</p>
      </div>
    </div>
  );
}
