import { productService } from "@/lib/productService";
import { materialService } from "@/lib/materialService";
import { galleryService } from "@/lib/galleryService";
import { messageService } from "@/lib/messageService";

import type { AdminSearchResult } from "@/types/adminSearch";

class AdminSearchService {
  async search(keyword: string): Promise<AdminSearchResult[]> {
    const query = keyword.trim().toLowerCase();

    if (!query) return [];

    const [
      products,
      materials,
      galleries,
      messages,
    ] = await Promise.all([
      productService.getAll(),
      materialService.getAll(),
      galleryService.getAll(),
      messageService.getAll(),
    ]);

    const results: AdminSearchResult[] = [];

    // ===========================
    // PRODUCT
    // ===========================

    products
      .filter((item) => {
        return [
          item.name,
          item.description,
          ...(item.category ?? []),
          ...(item.room ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .forEach((item) => {
        results.push({
          id: item.id,
          type: "product",
          title: item.name,
          subtitle: item.category?.join(", "),
          image: item.image,
          href: `/admin/product/${item.id}/edit`,
        });
      });

    // ===========================
    // MATERIAL
    // ===========================

    materials
      .filter((item) => {
        return [
          item.name,
          item.description,
          item.category,
          item.feature,
          item.color,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .forEach((item) => {
        results.push({
          id: item.id,
          type: "material",
          title: item.name,
          subtitle: item.category,
          image: item.image,
          href: `/admin/material/${item.id}/edit`,
        });
      });

    // ===========================
    // GALLERY
    // ===========================

    galleries
      .filter((item) => {
        return [
          item.title,
          item.description,
          item.location,
          item.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .forEach((item) => {
        results.push({
          id: item.id,
          type: "gallery",
          title: item.title,
          subtitle: item.location,
          image: item.image,
          href: `/admin/gallery/${item.id}/edit`,
        });
      });

    // ===========================
    // MESSAGE
    // ===========================

    messages
      .filter((item) => {
        return [
          item.name,
          item.phone,
          item.email,
          item.address,
          item.productName,
          item.material,
          item.service,
          item.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .forEach((item) => {
        results.push({
          id: item.id,
          type: "message",
          title: item.name,
          subtitle: item.message,
          href: `/admin/messages/${item.id}`,
        });
      });

    return results;
  }
}

export const adminSearchService = new AdminSearchService();