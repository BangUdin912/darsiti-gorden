/**
 * ==========================
 * PRODUCT
 * ==========================
 */

export interface Product {
  id: string;

  slug: string;

  /**
   * Nama produk
   * Contoh:
   * Blackout Premium
   */
  name: string;

  /**
   * Deskripsi singkat
   */
  short_description: string | null;

  /**
   * Deskripsi lengkap
   */
  description: string | null;

  /**
   * URL gambar utama
   */
  image: string;

  /**
   * Kategori produk
   * Contoh:
   * ["Blackout", "Minimalis"]
   */
  category: string[];

  /**
   * Cocok digunakan untuk ruangan
   * Contoh:
   * ["Rumah", "Hotel", "Kantor"]
   */
  room: string[];

  /**
   * Jenis produk
   * Contoh:
   * Gorden
   * Roller Blind
   * Vertical Blind
   */
  type: string;

  /**
   * Produk unggulan
   */
  featured: boolean;

  /**
   * Harga (opsional)
   * Saat ini tidak ditampilkan di website
   */
  price: string | null;

  /**
   * SEO
   */
  seo_title: string | null;
  seo_description: string | null;

  /**
   * Status aktif
   */
  is_active: boolean;

  /**
   * Timestamp
   */
  created_at: string;
  updated_at: string;
}

/**
 * ==========================
 * CREATE PRODUCT
 * ==========================
 */

export interface CreateProduct {
  name: string;

  short_description?: string | null;

  description?: string | null;

  image: string;

  category: string[];

  room: string[];

  type: string;

  featured?: boolean;

  price?: string | null;

  seo_title?: string | null;

  seo_description?: string | null;

  is_active?: boolean;
}

/**
 * ==========================
 * UPDATE PRODUCT
 * ==========================
 */

export interface UpdateProduct
  extends Partial<CreateProduct> {}