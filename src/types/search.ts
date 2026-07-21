export type SearchType =
  | "product"
  | "material"
  | "gallery"
  | "message";


export interface SearchResult {
  /**
   * ID dari database
   */
  id: string;

  /**
   * Jenis data
   */
  type: SearchType;

  /**
   * Judul utama yang ditampilkan
   */
  title: string;

  /**
   * Deskripsi singkat (opsional)
   */
  description?: string;

  /**
   * Slug untuk navigasi
   */
  slug: string;

  /**
   * Gambar thumbnail (opsional)
   */
  image?: string;

  /**
   * Link tujuan
   * contoh:
   * /admin/product/gorden-blackout
   * /admin/material/blackout
   * /admin/gallery/rumah-minimalis
   * /admin/messages/id
   */
  href: string;
}


export interface SearchState {
  keyword: string;
  loading: boolean;
  results: SearchResult[];
}


export interface SearchResponse {
  products: SearchResult[];
  materials: SearchResult[];
  galleries: SearchResult[];
  messages: SearchResult[];
}


export interface GlobalSearchResult {
  keyword: string;
  total: number;
  results: SearchResult[];
}