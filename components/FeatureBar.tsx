import { TruckIcon, HeadsetIcon, RefreshIcon } from "./Icons";

const features = [
  {
    icon: TruckIcon,
    title: "Ücretsiz Teslimat",
    text: "500₺ ve üzeri tüm siparişlerde",
  },
  {
    icon: HeadsetIcon,
    title: "7/24 Müşteri Desteği",
    text: "İhtiyacınız olduğunda yanınızdayız",
  },
  {
    icon: RefreshIcon,
    title: "Tazelik Garantisi",
    text: "Memnun kalmazsanız iade garantisi",
  },
];

export default function FeatureBar() {
  return (
    <section className="container-x py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center gap-2 rounded-lg border border-line bg-cream px-6 py-5 text-center sm:flex-row sm:gap-4 sm:text-left"
          >
            <f.icon className="h-8 w-8 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ink">
                {f.title}
              </p>
              <p className="text-xs text-muted">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
