import { supabase } from "@/lib/supabaseClient";
const BUCKET = "material-images";
import type {
  Material,
  CreateMaterial,
  UpdateMaterial,
} from "@/types/material";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(
  name: string
): Promise<string> {
  const baseSlug = createSlug(name);

  const { data } = await supabase
    .from("materials")
    .select("slug")
    .ilike("slug", `${baseSlug}%`);

  const slugs = (data ?? []).map(item => item.slug);

  if (!slugs.includes(baseSlug)) {
    return baseSlug;
  }

  let index = 1;
  let slug = `${baseSlug}-${index}`;

  while (slugs.includes(slug)) {
    index++;
    slug = `${baseSlug}-${index}`;
  }

  return slug;
}

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
.eq("is_active", true)
.order("created_at", {
    ascending: false,
});

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
  const slug = await generateUniqueSlug(payload.name);

  const { data, error } = await supabase
    .from("materials")
    .insert({
      ...mapPayload(payload),
      slug,
    })
    .select()
    .single();

  if (error) throw error;

  return mapMaterial(data);
},

  /**
   * UPDATE
   */
async update(
  id: string,
  payload: UpdateMaterial
): Promise<Material> {
  const current = await this.getById(id);

  if (!current) {
    throw new Error("Material tidak ditemukan.");
  }

  const updateData = {
    ...mapPayload(payload),
    updated_at: new Date().toISOString(),
  } as Partial<Material>;

  if (
    payload.name &&
    payload.name !== current.name
  ) {
    updateData.slug = await generateUniqueSlug(
      payload.name
    );
  }

  const { data, error } = await supabase
    .from("materials")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[material.update]", error);
    throw error;
  }

  return mapMaterial(data);
},

  /**
   * DELETE
   */
async delete(id: string): Promise<boolean> {
  const material = await this.getById(id);

  if (!material) return false;

  if (
    material.image &&
    material.image.includes("/material-images/")
  ) {
    const path = decodeURIComponent(
      material.image.split("/material-images/")[1]
    );

    if (path) {
      await supabase.storage
        .from(BUCKET)
        .remove([path]);
    }
  }

  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
},

async uploadImage(file: File): Promise<{
  url: string;
  path: string;
}> {

  const ext = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  if (!ext) {
    throw new Error("Format gambar tidak valid.");
  }

  const allowed = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  if (!allowed.includes(ext)) {
    throw new Error(
      "Format gambar harus JPG, PNG, atau WEBP."
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error(
      "Ukuran gambar maksimal 5MB."
    );
  }

  const path =
    `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return {
    url: data.publicUrl,
    path,
  };
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
  const { count, error } = await supabase
    .from("materials")
    .select("*", {
      head: true,
      count: "exact",
    });

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
},
async deleteImage(path: string) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    throw error;
  }
},

  async search(
  keyword: string
): Promise<Material[]> {

  const query = keyword.trim().toLowerCase();

  if (!query) return [];

  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("is_active", true)
    .or(
      [
        `name.ilike.%${query}%`,
        `description.ilike.%${query}%`,
        `category.ilike.%${query}%`,
        `feature.ilike.%${query}%`,
        `color.ilike.%${query}%`,
      ].join(",")
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.error("[material.search]", error);
    return [];
  }

  return (data ?? []).map(mapMaterial);
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

