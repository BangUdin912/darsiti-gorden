import { createClient } from "@supabase/supabase-js";

import type {
  Material,
  CreateMaterial,
  UpdateMaterial,
} from "@/types/material";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const materialService = {
  /**
   * GET ALL
   */
  async getAll(): Promise<Material[]> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []).map(mapMaterial);
  },

  /**
   * GET ACTIVE
   */
  async getActive(): Promise<Material[]> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []).map(mapMaterial);
  },

  /**
   * GET FEATURED
   */
  async getFeatured(): Promise<Material[]> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("featured", true)
      .eq("is_active", true);

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []).map(mapMaterial);
  },

  /**
   * GET BY ID
   */
  async getById(id: string): Promise<Material | null> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;

    return mapMaterial(data);
  },

  /**
   * GET BY SLUG
   */
  async getBySlug(slug: string): Promise<Material | null> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;

    return mapMaterial(data);
  },

  /**
   * GET BY CATEGORY
   */
  async getByCategory(category: string): Promise<Material[]> {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []).map(mapMaterial);
  },

  /**
   * CREATE
   */
  async create(payload: CreateMaterial): Promise<Material> {
    const { data, error } = await supabase
      .from("materials")
      .insert(mapPayload(payload))
      .select()
      .single();

    if (error) throw new Error(error.message);

    return mapMaterial(data);
  },

  /**
   * UPDATE
   */
  async update(
    id: string,
    payload: UpdateMaterial
  ): Promise<Material> {
    const { data, error } = await supabase
      .from("materials")
      .update({
        ...mapPayload(payload),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return mapMaterial(data);
  },

  /**
   * DELETE
   */
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    return true;
  },

  async getRecent(limit = 5): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapMaterial);
},

  /**
   * COUNT
   */
  async getCount(): Promise<number> {
    const { count } = await supabase
      .from("materials")
      .select("*", {
        count: "exact",
        head: true,
      });

    return count ?? 0;
  },
};

/* =========================
   MAP DATABASE
========================= */

type MaterialRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string | null;
  description: string | null;
  feature: string | null;
  color: string | null;
  price: number | null;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

function mapMaterial(row: MaterialRow): Material {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Material["category"],
    image: row.image ?? "",
    description: row.description ?? "",
    feature: row.feature ?? "",
    color: row.color ?? "",
    price: row.price ?? undefined,
    featured: row.featured,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/* =========================
   MAP PAYLOAD
========================= */

function mapPayload(
  material: Partial<CreateMaterial>
) {
  return {
    slug: material.slug,
    name: material.name,
    category: material.category,
    image: material.image ?? null,
    description: material.description ?? null,
    feature: material.feature ?? null,
    color: material.color ?? null,
    price: material.price ?? null,
    featured: material.featured ?? false,
    is_active: material.is_active ?? true,
  };
}