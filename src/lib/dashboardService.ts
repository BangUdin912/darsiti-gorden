import { productService } from "@/lib/productService";
import { galleryService } from "@/lib/galleryService";
import { materialService } from "@/lib/materialService";
import { messageService } from "@/lib/messageService";

import type { Product } from "@/types/product";
import type { GalleryItem } from "@/types/gallery";
import type { Material } from "@/types/material";
import type { Message } from "@/types/message";

/**
 * =========================
 * TYPES
 * =========================
 */

export interface DashboardStats {
  products: number;
  gallery: number;
  materials: number;
  messages: number;
}

export interface DashboardData {
  products: Product[];
  gallery: GalleryItem[];
  materials: Material[];
  messages: Message[];
}

/**
 * =========================
 * SAFE HELPER
 * =========================
 */

function safe<T>(
  result: PromiseSettledResult<T>,
  fallback: T
): T {
  return result.status === "fulfilled"
    ? result.value
    : fallback;
}

/**
 * =========================
 * DASHBOARD SERVICE
 * =========================
 */

export const dashboardService = {
  /**
   * Recent Data
   */
  async getDashboard(): Promise<DashboardData> {
    const [
      productsRes,
      galleryRes,
      materialsRes,
      messagesRes,
    ] = await Promise.allSettled([
      productService.getRecent(5),
      galleryService.getRecent(5),
      materialService.getAll(),
      messageService.getRecent(5),
    ]);

    return {
      products: safe(productsRes, []),
      gallery: safe(galleryRes, []),
      materials: safe(materialsRes, []),
      messages: safe(messagesRes, []),
    };
  },

  /**
   * Dashboard Statistics
   */
  async getStats(): Promise<DashboardStats> {
    const [
      productCount,
      galleryCount,
      materialCount,
      messageCount,
    ] = await Promise.allSettled([
      productService.getCount(),
      galleryService.getCount(),
      materialService.getCount(),
      messageService.getCount(),
    ]);

    return {
      products: safe(productCount, 0),
      gallery: safe(galleryCount, 0),
      materials: safe(materialCount, 0),
      messages: safe(messageCount, 0),
    };
  },

  /**
   * Dashboard Data + Statistics
   */
  async getAll() {
    const [dashboard, stats] = await Promise.all([
      this.getDashboard(),
      this.getStats(),
    ]);

    return {
      ...dashboard,
      stats,
    };
  },
};