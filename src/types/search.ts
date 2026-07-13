export type SearchType =
  | "product"
  | "material"
  | "gallery";

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
   * /product/gorden-blackout
   * /material/blackout
   * /gallery/rumah-minimalis
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
}

export interface GlobalSearchResult {
  keyword: string;
  total: number;
  results: SearchResult[];
}