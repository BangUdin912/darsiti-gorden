import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/types/product";

const BUCKET = "product-images";

/* =====================================
   HELPER
===================================== */

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = createSlug(name);

  const { data } = await supabase
    .from("products")
    .select("slug")
    .ilike("slug", `${baseSlug}%`);

  const slugs = (data ?? []).map((item) => item.slug);

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

/* =====================================
   MAP PRODUCT
===================================== */

function mapProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,

    short_description: row.short_description ?? null,
    description: row.description ?? null,

    image: row.image ?? "",

    category: Array.isArray(row.category)
      ? row.category
      : [],

    room: Array.isArray(row.room)
      ? row.room
      : [],

    type: row.type ?? "",

    featured: row.featured ?? false,

    price: row.price ?? null,

    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,

    is_active: row.is_active ?? true,

    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/* =====================================
   SERVICE
===================================== */

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[product.getAll]", error);
      return [];
    }

    return (data ?? []).map(mapProduct);
  },

  async getFeatured(limit = 4): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[product.getFeatured]", error);
      return [];
    }

    return (data ?? []).map(mapProduct);
  },

  async getRecent(limit = 5): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[product.getRecent]", error);
      return [];
    }

    return (data ?? []).map(mapProduct);
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[product.getById]", error);
      return null;
    }

    return data ? mapProduct(data) : null;
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("[product.getBySlug]", error);
      return null;
    }

    return data ? mapProduct(data) : null;
  },

  async getRelated(
  category: string,
  slug: string,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("category", [category])
    .neq("slug", slug)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[product.getRelated]", error);
    return [];
  }

  return (data ?? []).map(mapProduct);
},

  async create(product: Partial<Product>) {
    if (product.name) {
      product.slug = await generateUniqueSlug(product.name);
    }

    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error("[product.create]", error);
      throw error;
    }

    return data ? mapProduct(data) : null;
  },

  async update(id: string, product: Partial<Product>) {
    if (product.name) {
      const current = await this.getById(id);

      if (current && current.name !== product.name) {
        product.slug = await generateUniqueSlug(product.name);
      }
    }

    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[product.update]", error);
      throw error;
    }

    return data ? mapProduct(data) : null;
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

  if (error) {
    console.error(
      "[product.uploadImage]",
      error
    );
    throw error;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return {
    url: data.publicUrl,
    path,
  };
},

  async delete(id: string) {
  const product = await this.getById(id);

  if (!product) return;

  if (
    product.image &&
    product.image.includes("/product-images/")
  ) {
    const path = decodeURIComponent(
      product.image.split("/product-images/")[1]
    );

    if (path) {
      await supabase.storage
        .from(BUCKET)
        .remove([path]);
    }
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[product.delete]", error);
    throw error;
  }
},

async deleteImage(path: string) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    console.error("[product.deleteImage]", error);
    throw error;
  }
},

  async getCount(): Promise<number> {
    const { count, error } = await supabase
      .from("products")
      .select("*", {
        head: true,
        count: "exact",
      });

    if (error) {
      console.error("[product.getCount]", error);
      return 0;
    }

    return count ?? 0;
  },

 /**
 * SEARCH PRODUCT
 */
async search(keyword: string): Promise<Product[]> {
  const query = keyword.trim();

  if (!query) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .or(
      [
        `name.ilike.%${query}%`,
        `description.ilike.%${query}%`,
        `slug.ilike.%${query}%`,
      ].join(",")
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.error("[product.search]", error);

    return [];
  }

  if (!data) return [];

  return data
  .filter((item) => {
    return [
      item.name,
      item.description,
      ...(item.category ?? []),
      ...(item.room ?? []),
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
  })
  .map(mapProduct);
},

async getByCategory(
  category: string
): Promise<Product[]> {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("category", [category])
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapProduct);
},

async getActive(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapProduct);
},

async getByRoom(
  room: string
): Promise<Product[]> {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("room", [room])
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapProduct);
},

async getByCategoryAndRoom(
  category: string,
  room: string
): Promise<Product[]> {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("category", [category])
    .contains("room", [room])
    .eq("is_active", true);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapProduct);
},
};

