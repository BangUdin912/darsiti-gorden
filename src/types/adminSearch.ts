// src/types/adminSearch.ts

export type AdminSearchType =
  | "product"
  | "material"
  | "gallery"
  | "message";

export interface AdminSearchResult {
  /**
   * ID data
   */
  id: string;

  /**
   * Jenis data
   */
  type: AdminSearchType;

  /**
   * Judul utama
   * Contoh:
   * Product  : Blackout Premium
   * Material : Blackout Korea
   * Gallery  : Hotel Aston
   * Message  : Nur Khoerudin
   */
  title: string;

  /**
   * Informasi tambahan
   */
  subtitle?: string;

  /**
   * URL gambar (opsional)
   */
  image?: string;

  /**
   * Link tujuan saat hasil diklik
   */
  href: string;

  /**
   * Data asli (opsional)
   * Berguna jika nanti ingin membuka modal/detail
   * tanpa melakukan fetch ulang.
   */
  data?: unknown;
}

export interface AdminSearchResponse {
  keyword: string;

  total: number;

  results: AdminSearchResult[];
}