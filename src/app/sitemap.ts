import type { MetadataRoute } from "next";

import { productService } from "@/lib/productService";
import { materialService } from "@/lib/materialService";
import { galleryService } from "@/lib/galleryService";

const BASE_URL =
  "https://www.gordenmurahpurwokerto.store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    products,
    materials,
    galleries,
  ] = await Promise.all([
    productService.getActive(),
    materialService.getActive(),
    galleryService.getActive(),
  ]);

  const now = new Date();

  // Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/product`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/material`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Product Pages
  const productPages: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: `${BASE_URL}/product/${product.slug}`,
      lastModified: new Date(
        product.updated_at
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Material Pages
  const materialPages: MetadataRoute.Sitemap =
    materials.map((material) => ({
      url: `${BASE_URL}/material/${material.slug}`,
      lastModified: new Date(
        material.updated_at
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Gallery Pages
  const galleryPages: MetadataRoute.Sitemap =
    galleries.map((gallery) => ({
      url: `${BASE_URL}/gallery/${gallery.slug}`,
      lastModified: new Date(
        gallery.updated_at
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...productPages,
    ...materialPages,
    ...galleryPages,
  ];
}