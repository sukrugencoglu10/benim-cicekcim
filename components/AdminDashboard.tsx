"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { categories, formatPrice, site } from "@/lib/config";
import type { Product } from "@/lib/types";

const empty = {
  name: "",
  description: "",
  price: "",
  sale_price: "",
  category: "new",
  badge: "",
  image_url: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts((data as Product[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function resetForm() {
    setForm({ ...empty });
    setFile(null);
    setEditingId(null);
  }

  async function uploadImage(): Promise<string> {
    if (!file) return form.image_url;
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const image_url = await uploadImage();
      if (!image_url) throw new Error("Lütfen bir görsel seçin.");

      const payload = {
        name: form.name,
        description: form.description || null,
        price: Number(form.price) || 0,
        sale_price: form.sale_price ? Number(form.sale_price) : null,
        category: form.category,
        badge: form.badge || null,
        image_url,
      };

      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        setMsg("Ürün güncellendi. ✅");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        setMsg("Çiçek eklendi. 🌸");
      }
      resetForm();
      load();
    } catch (err) {
      setMsg("Hata: " + (err instanceof Error ? err.message : "işlem başarısız"));
    } finally {
      setBusy(false);
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description ?? "",
      price: String(p.price),
      sale_price: p.sale_price != null ? String(p.sale_price) : "",
      category: p.category,
      badge: p.badge ?? "",
      image_url: p.image_url,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Üst bar */}
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-ink">
            {site.name} <span className="text-sm text-brand">Yönetim</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted hover:text-brand">Siteyi gör</Link>
            <button onClick={logout} className="text-muted hover:text-brand">Çıkış</button>
          </div>
        </div>
      </header>

      <div className="container-x grid grid-cols-1 gap-8 py-10 lg:grid-cols-[380px_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="h-fit space-y-4 rounded-xl border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-medium text-ink">
            {editingId ? "Çiçeği Düzenle" : "Yeni Çiçek Ekle"}
          </h2>

          <Field label="Ürün adı">
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input" />
          </Field>

          <Field label="Açıklama">
            <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className="input" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Fiyat (₺)">
              <input required type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} className="input" />
            </Field>
            <Field label="İndirimli fiyat (₺)">
              <input type="number" min="0" value={form.sale_price} onChange={(e) => set("sale_price", e.target.value)} className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori">
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className="input">
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Rozet (ops.)">
              <input value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="örn. İndirim" className="input" />
            </Field>
          </div>

          <Field label="Görsel">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="input file:mr-3 file:rounded file:border-0 file:bg-brand-soft file:px-3 file:py-1 file:text-brand-dark" />
            {form.image_url && !file && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image_url} alt="" className="mt-2 h-20 w-20 rounded object-cover" />
            )}
          </Field>

          {msg && <p className="rounded-md bg-brand-soft px-3 py-2 text-xs text-brand-dark">{msg}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="btn-brand flex-1 disabled:opacity-60">
              {busy ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-outline">Vazgeç</button>
            )}
          </div>
        </form>

        {/* Ürün listesi */}
        <div>
          <h2 className="mb-4 text-lg font-medium text-ink">
            Ürünler <span className="text-sm text-muted">({products.length})</span>
          </h2>
          <div className="space-y-3">
            {products.length === 0 && (
              <p className="rounded-lg border border-dashed border-line bg-white px-4 py-8 text-center text-sm text-muted">
                Henüz ürün yok. Soldaki formdan ilk çiçeğinizi ekleyin.
              </p>
            )}
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-lg border border-line bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image_url} alt={p.name} className="h-14 w-14 shrink-0 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-muted">
                    {formatPrice(p.sale_price ?? p.price)} ·{" "}
                    {categories.find((c) => c.key === p.category)?.label}
                  </p>
                </div>
                <button onClick={() => startEdit(p)} className="text-xs font-medium text-brand hover:underline">Düzenle</button>
                <button onClick={() => remove(p.id)} className="text-xs font-medium text-red-500 hover:underline">Sil</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid #ece7ea;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #a86d8f;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
