import type { CategoryKey } from "./config";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  category: CategoryKey;
  badge: string | null;
  image_url: string;
  created_at?: string;
}
