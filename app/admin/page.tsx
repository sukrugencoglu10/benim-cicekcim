import Link from "next/link";
import AdminDashboard from "@/components/AdminDashboard";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Yönetim Paneli", robots: { index: false } };

export default function AdminPage() {
  if (!supabaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="max-w-md rounded-xl border border-line bg-white p-8 text-center shadow-card">
          <h1 className="font-serif text-2xl font-semibold text-ink">Kurulum gerekli</h1>
          <p className="mt-3 text-sm text-muted">
            Yönetim panelini kullanmak için Supabase bağlantısını yapılandırın.
            <br />
            <code className="mt-2 inline-block rounded bg-cream px-2 py-1 text-xs">.env.local</code>{" "}
            dosyasına anahtarlarınızı girin (bkz. <strong>README.md</strong>).
          </p>
          <Link href="/" className="btn-brand mt-6">Anasayfaya dön</Link>
        </div>
      </main>
    );
  }

  return <AdminDashboard />;
}
