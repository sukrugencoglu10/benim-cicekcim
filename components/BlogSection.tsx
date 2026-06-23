import Link from "next/link";
import { ArrowRight } from "./Icons";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

const posts = [
  {
    day: "20",
    month: "Ekim",
    title: "Sonbahar Çiçek Bakım Rehberi",
    image: img("photo-1508610048659-a06b669e3321"),
  },
  {
    day: "18",
    month: "Haziran",
    title: "Buketinizi Daha Uzun Süre Taze Tutmanın 7 Yolu",
    image: img("photo-1502301197179-65228ab57f78"),
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="container-x py-14">
      <h2 className="section-title mb-10">SON YAZILARIMIZ</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group flex gap-5 rounded-lg border border-line p-4 transition-shadow hover:shadow-card"
          >
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-brand">
                <span className="font-serif text-3xl font-semibold">{post.day}</span>
                <span className="ml-1 text-sm">/{post.month}</span>
              </p>
              <h3 className="mt-1 text-base font-medium text-ink">{post.title}</h3>
              <Link
                href="#blog"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted transition-colors hover:text-brand"
              >
                Devamı <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
