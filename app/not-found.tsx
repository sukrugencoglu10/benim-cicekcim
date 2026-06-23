import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="font-serif text-6xl font-semibold text-brand">404</p>
      <h1 className="mt-3 text-xl font-medium text-ink">Sayfa bulunamadı</h1>
      <p className="mt-2 text-sm text-muted">Aradığınız çiçek başka bir bahçede olabilir.</p>
      <Link href="/" className="btn-brand mt-6">Anasayfaya dön</Link>
    </main>
  );
}
