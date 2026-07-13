export interface Product {
  id: string;

  slug: string;

  name: string;

  short_description: string | null;

  description: string |null;

  image: string;

  category: string[];

  room: string[];

  type: string;

  featured: boolean;

  price: string | null;

  seo_title: string | null;

  seo_description: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export type CreateProduct = Omit<
  Product,
  "id" | "slug" | "created_at" | "updated_at"
>;

export type UpdateProduct = Partial<CreateProduct>;