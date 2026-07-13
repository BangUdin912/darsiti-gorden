export interface Material {
  id: string;

  slug: string;

  name: string;

  category: MaterialCategory;

  image: string;

  description?: string;

  feature?: string;

  color?: string;

  price?: number;

  featured: boolean;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export interface CreateMaterial {
  slug: string;

  name: string;

  category: MaterialCategory;

  image?: string;

  description?: string;

  feature?: string;

  color?: string;

  price?: number;

  featured?: boolean;

  is_active?: boolean;
}

export interface UpdateMaterial
  extends Partial<CreateMaterial> {}

export type MaterialCategory =
  | "Blackout"
  | "Lokal"
  | "Vitrase"
  | "Blind";