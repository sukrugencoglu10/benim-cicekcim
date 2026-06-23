import { waLink } from "@/lib/config";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Merhaba, çiçek siparişi hakkında bilgi almak istiyorum.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 animate-wa-pulse"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
