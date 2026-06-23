import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { getProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const productUrls = products.map((p) => ({
    url: `${site.url}/urun/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/magaza`, lastModified: new Date(), priority: 0.9 },
    { url: `${site.url}/iletisim`, lastModified: new Date(), priority: 0.5 },
    ...productUrls,
  ];
}
