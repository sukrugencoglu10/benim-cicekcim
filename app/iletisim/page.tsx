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

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* İletişim bilgileri */}
          <div className="space-y-6">
            <InfoRow icon={<PinIcon className="h-5 w-5 text-brand" />} title="Adres" value={site.address} />
            <InfoRow icon={<PhoneIcon className="h-5 w-5 text-brand" />} title="Telefon" value={site.phone} />
            <InfoRow icon={<MailIcon className="h-5 w-5 text-brand" />} title="E-posta" value={site.email} />

            <a
              href={waLink("Merhaba, bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp ile Yazın
            </a>
          </div>

          {/* Basit form (demo) */}
          <form className="space-y-4 rounded-lg border border-line bg-cream p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input className="rounded-md border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand" placeholder="Adınız" />
              <input className="rounded-md border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand" placeholder="E-posta" type="email" />
            </div>
            <input className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand" placeholder="Konu" />
            <textarea rows={5} className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand" placeholder="Mesajınız" />
            <button type="button" className="btn-brand w-full">Gönder</button>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function InfoRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
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
