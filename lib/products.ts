import { createClient, supabaseConfigured } from "./supabase/server";
import { demoProducts } from "./demo-data";
import type { Product } from "./types";
import type { CategoryKey } from "./config";

// Tüm ürünleri getirir. Supabase yoksa demo veriye düşer.
export async function getProducts(category?: CategoryKey): Promise<Product[]> {
  if (!supabaseConfigured) {
    return category
      ? demoProducts.filter((p) => p.category === category)
      : demoProducts;
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error || !data) throw error;
    return data as Product[];
  } catch {
    // Bağlantı/tablo hatasında siteyi ayakta tutmak için demo veri
    return category
      ? demoProducts.filter((p) => p.category === category)
      : demoProducts;
  }
}

// Tek ürün getirir.
export async function getProduct(id: string): Promise<Product | null> {
  if (!supabaseConfigured) {
    return demoProducts.find((p) => p.id === id) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) throw error;
    return data as Product;
  } catch {
    return demoProducts.find((p) => p.id === id) ?? null;
  }
}
