import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

// Canlı arama için ürün listesini döndürür (Supabase yoksa demo veri).
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
