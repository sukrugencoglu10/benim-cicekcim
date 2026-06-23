# Benim Çiçekçim 🌸

Premium, açık tonlu bir çiçek e-ticaret sitesi + Supabase destekli çiçek ekleme paneli.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase.

## Özellikler
- 🎨 Referans (Alto) düzeniyle birebir: hero grid, YENİ/ÖNE ÇIKAN/İNDİRİMDE sekmeleri, 4'lü ürün gridi, özellik bandı, blog, marka şeridi, bülten + footer
- 🟢 Sağ altta sabit **WhatsApp** butonu + her üründe "WhatsApp ile Sipariş"
- 🛠️ `/admin` yönetim paneli: çiçek **ekle / düzenle / sil** + görsel yükleme (Supabase Storage)
- 🔐 Supabase Auth ile korumalı admin (middleware)
- 📈 **Google Analytics + AdSense** hazır (ENV girince otomatik aktif), `sitemap.xml`, `robots.txt`, SEO meta
- ⚡ Supabase yoksa bile **demo verilerle** çalışır — tasarımı hemen görürsünüz

## Hızlı Başlangıç
```bash
npm install
npm run dev
```
Tarayıcıda: http://localhost:3000 — admin: http://localhost:3000/admin

> ENV ayarlanmadan da site demo ürünlerle açılır. Admin paneli için Supabase gerekir.

## Supabase Kurulumu
1. https://supabase.com → ücretsiz proje oluşturun.
2. **SQL Editor** → `supabase/schema.sql` içeriğini yapıştırıp çalıştırın (tablo + RLS + Storage bucket).
3. **Authentication → Users → Add user** ile admin e-posta/şifre oluşturun.
4. **Project Settings → API** → `Project URL` ve `anon public` anahtarını kopyalayın.
5. `.env.local.example` dosyasını `.env.local` olarak kopyalayıp doldurun:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
6. `npm run dev` → `/admin/login` üzerinden giriş yapıp çiçek ekleyin.

## Google Reklam / Analitik
`.env.local` içine ekleyin (boşsa yüklenmez):
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```
Reklam birimleri `<AdSlot slot="..."/>` ile gösterilir; ID girilince placeholder yerine gerçek reklam çıkar.

## WhatsApp Numarası
Numara tek yerden değişir — `.env.local`:
```
NEXT_PUBLIC_WHATSAPP=905XXXXXXXXX   # ülke koduyla, sadece rakam
```
veya `lib/config.ts` içindeki varsayılanı düzenleyin.

## Özelleştirme
- Marka adı / adres / sosyal linkler: `lib/config.ts`
- Renk paleti (açık tonlar): `tailwind.config.ts`
- Demo ürünler: `lib/demo-data.ts`

## Yayına Alma
Vercel önerilir: repoyu bağlayın, **Environment Variables** kısmına `.env.local`
değişkenlerini girin, deploy edin.

## Klasör Yapısı
```
app/        sayfalar (anasayfa, magaza, urun/[id], iletisim, admin, sitemap, robots)
components/ Header, Footer, Hero, ProductTabs, ProductCard, WhatsAppButton, AdminDashboard ...
lib/        config, types, products (veri katmanı), supabase istemcileri, demo veri
supabase/   schema.sql (tablo + RLS + storage)
middleware.ts  /admin koruması
```
