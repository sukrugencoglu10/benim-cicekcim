const brands = ["Westage", "Wallace", "Robert", "London", "Andrew", "Lee Theme"];

export default function BrandStrip() {
  return (
    <section className="container-x py-10">
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {brands.map((b) => (
          <span
            key={b}
            className="font-serif text-xl font-semibold uppercase tracking-widest text-ink/30 transition-colors hover:text-brand"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
