-- ════════════════════════════════════════════════════════════
--  Benim Çiçekçim — Supabase şeması
--  Supabase paneli → SQL Editor → bu dosyayı yapıştırıp çalıştırın.
-- ════════════════════════════════════════════════════════════

-- 1) Ürünler tablosu ------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric not null default 0,
  sale_price  numeric,
  category    text not null default 'new'
              check (category in ('new', 'featured', 'onsale')),
  badge       text,
  image_url   text not null default '',
  created_at  timestamptz not null default now()
);

-- 2) RLS: herkes okuyabilir, sadece giriş yapan admin yazabilir ------
alter table public.products enable row level security;

drop policy if exists "Herkes ürünleri görebilir" on public.products;
create policy "Herkes ürünleri görebilir"
  on public.products for select
  using (true);

drop policy if exists "Adminler ekleyebilir" on public.products;
create policy "Adminler ekleyebilir"
  on public.products for insert
  to authenticated with check (true);

drop policy if exists "Adminler güncelleyebilir" on public.products;
create policy "Adminler güncelleyebilir"
  on public.products for update
  to authenticated using (true) with check (true);

drop policy if exists "Adminler silebilir" on public.products;
create policy "Adminler silebilir"
  on public.products for delete
  to authenticated using (true);

-- 3) Görseller için Storage bucket'ı (public okuma) -----------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Görseller herkese açık" on storage.objects;
create policy "Görseller herkese açık"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Adminler görsel yükleyebilir" on storage.objects;
create policy "Adminler görsel yükleyebilir"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'product-images');

drop policy if exists "Adminler görsel silebilir" on storage.objects;
create policy "Adminler görsel silebilir"
  on storage.objects for delete
  to authenticated using (bucket_id = 'product-images');

-- 4) Örnek veri (opsiyonel) -----------------------------------------
insert into public.products (name, description, price, sale_price, category, badge, image_url)
values
  ('Vazo Günbatımı', 'Mevsim çiçeklerinden zarif pembe aranjman.', 860, 830, 'new', null,
   'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80'),
  ('Neşeli Vazo', 'Canlı sarı ve turuncu güllerle.', 880, 860, 'new', null,
   'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=600&q=80'),
  ('Anı Aranjmanı', 'Pastel tonlarda özel gün buketi.', 780, 720, 'onsale', 'İndirim',
   'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80'),
  ('Mor Bahar Vazosu', 'Mor gerberalar ile şık bir dokunuş.', 480, null, 'onsale', 'İndirim',
   'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80')
on conflict do nothing;

-- ════════════════════════════════════════════════════════════
--  Admin kullanıcısı: Supabase paneli → Authentication → Users
--  → "Add user" ile e-posta/şifre oluşturun. Bu kullanıcı /admin
--  paneline giriş yapabilir.
-- ════════════════════════════════════════════════════════════
