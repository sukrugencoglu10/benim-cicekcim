"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { site } from "@/lib/config";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!supabaseConfigured) {
      setError("Supabase yapılandırılmamış. README'deki kurulum adımlarını izleyin.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-xl border border-line bg-white p-8 shadow-card">
        <Link href="/" className="block text-center">
          <span className="font-serif text-2xl font-semibold text-ink">{site.name}</span>
        </Link>
        <h1 className="mt-6 text-center text-lg font-medium text-ink">Yönetim Girişi</h1>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            className="w-full rounded-md border border-line px-4 py-3 text-sm outline-none focus:border-brand"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full rounded-md border border-line px-4 py-3 text-sm outline-none focus:border-brand"
          />

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-brand w-full disabled:opacity-60">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-brand">← Siteye dön</Link>
        </p>
      </div>
    </main>
  );
}
