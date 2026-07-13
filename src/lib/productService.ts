import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    return data ?? [];
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

    return data ?? [];
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

    return data ?? [];
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

    return data;
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

    return data;
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
      .limit(limit);

    if (error) {
      console.error("[product.getRelated]", error);
      return [];
    }

    return data ?? [];
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

    return data;
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

    return data;
  },

  async delete(id: string) {
    const product = await this.getById(id);

    if (!product) return;

    if (product.image) {
      const path = decodeURIComponent(
        product.image.split("/product-images/")[1] ?? ""
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

  async uploadImage(file: File): Promise<{
    url: string;
    path: string;
  }> {
    const ext = file.name.split(".").pop();

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

    const path = fileName;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file);

    if (error) {
      console.error("[product.uploadImage]", error);
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
};

export { supabase };