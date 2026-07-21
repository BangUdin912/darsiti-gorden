import { supabase } from "@/lib/supabaseClient";
import { storageService } from "./storage";
import type { GalleryItem } from "@/types/gallery";

const BUCKET = "gallery";

/**
 * =========================
 * HELPER
 * =========================
 */

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate slug unik
 */
async function generateUniqueSlug(
  title: string
): Promise<string> {
  const baseSlug = createSlug(title);

  const { data } = await supabase
    .from("gallery")
    .select("slug")
    .ilike("slug", `${baseSlug}%`);

  const existingSlugs = (data ?? []).map(
    (d) => d.slug
  );

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let index = 1;
  let slug = `${baseSlug}-${index}`;

  while (existingSlugs.includes(slug)) {
    index++;
    slug = `${baseSlug}-${index}`;

    if (index > 1000) break;
  }

  return slug;
}

/**
 * =========================
 * SERVICE
 * =========================
 */

const galleryService = {
  /**
   * GET ALL (ADMIN)
   */
  async getAll(
    limit = 50
  ): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      console.error(
        "[galleryService.getAll]",
        error
      );
      return [];
    }

    return (data ?? []).map(mapGallery);
  },

  /**
   * GET RECENT
   */
  async getRecent(
    limit = 5
  ): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      console.error(
        "[galleryService.getRecent]",
        error
      );
      return [];
    }

    return (data ?? []).map(mapGallery);
  },

  /**
   * GET FEATURED
   */
async getFeatured(
  limit = 6
): Promise<GalleryItem[]> {

  const {
    data,
    error,
  } = await supabase
    .from("gallery")
    .select("*")
    .eq(
      "featured",
      true
    )
    .order(
      "created_at",
      {
        ascending: false,
      }
    )
    .limit(limit);


  if (error) {

    console.error(
      "[galleryService.getFeatured]",
      error.message
    );

    return [];

  }


  return (data ?? []).map(mapGallery);

},

  /**
   * Gallery untuk Homepage
   */
  async getHomeGallery(
    limit = 6
  ): Promise<GalleryItem[]> {
    const featured =
      await galleryService.getFeatured(limit);

    if (featured.length > 0) {
      return featured;
    }

    return galleryService.getActive(limit);
  },

  /**
   * GET ACTIVE
   */
async getActive(limit = 50) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(mapGallery);
},

  /**
   * GET BY SLUG
   */
async getBySlug(
  slug: string
): Promise<GalleryItem | null> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(
      "[galleryService.getBySlug]",
      error.message
    );
    return null;
  }

  return data ? mapGallery(data) : null;
},

  /**
   * GET BY ID
   */
  async getById(
    id: string
  ): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(
        "[galleryService.getById]",
        error
      );
      return null;
    }

    return data ? mapGallery(data) : null;
  },

  /**
   * CREATE
   */
  async create(
    item: Omit<
      GalleryItem,
      "id" | "slug" | "created_at" | "updated_at"
    >
  ): Promise<GalleryItem> {
    const slug = await generateUniqueSlug(
      item.title
    );

    const payload = {
      ...item,
      slug,
    };

    const { data, error } = await supabase
      .from("gallery")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error(
        "[galleryService.create]",
        error
      );
      console.error("Payload:", payload);
      throw error;
    }

return mapGallery(data);
  },

  /**
   * UPDATE
   */
  async update(
  id: string,
  item: Partial<
    Omit<
      GalleryItem,
      "id" | "created_at" | "updated_at"
    >
  >
): Promise<GalleryItem> {

  const current = await this.getById(id);

  if (!current) {
    throw new Error("Gallery tidak ditemukan.");
  }

  const payload = {
    ...item,
    updated_at: new Date().toISOString(),
  } as Partial<GalleryItem>;

  if (
    item.title &&
    item.title !== current.title
  ) {
    payload.slug = await generateUniqueSlug(
      item.title
    );
  }

  const { data, error } = await supabase
    .from("gallery")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[gallery.update]", error);
    throw error;
  }

  return mapGallery(data);
},

  /**
   * COUNT
   */
  async getCount(): Promise<number> {
    const { count, error } = await supabase
      .from("gallery")
      .select("*", {
        head: true,
        count: "exact",
      });

    if (error) {
      console.error(
        "[galleryService.getCount]",
        error
      );
      return 0;
    }

    return count ?? 0;
  },

  /**
   * DELETE
   */
  async delete(id: string): Promise<void> {
  const gallery = await this.getById(id);

  if (!gallery) return;

  if (gallery.image_path) {
    await this.deleteImage(gallery.image_path);
  }

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[gallery.delete]", error);
    throw error;
  }
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
    console.error("[gallery.uploadImage]", error);
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

  async getRelated(
  category: string,
  slug: string,
  limit = 6
): Promise<GalleryItem[]> {

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("category", category)
    .neq("slug", slug)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);


  if (error) {
    console.error(
      "[gallery.getRelated]",
      error
    );

    return [];
  }


  return (data ?? []).map(mapGallery);
},

async deleteImage(path: string) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    console.error(
      "[gallery.deleteImage]",
      error
    );
    throw error;
  }
},

async search(
  keyword: string
): Promise<GalleryItem[]> {

  const query = keyword.trim();

  if (!query) return [];


  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .or(
      [
        `title.ilike.%${query}%`,
        `description.ilike.%${query}%`,
        `location.ilike.%${query}%`,
        `category.ilike.%${query}%`,
      ].join(",")
    )
    .order(
      "created_at",
      {
        ascending:false,
      }
    )
    .limit(10);


  if (error) {

    console.error(
      "[gallery.search]",
      error
    );

    return [];

  }


  return (data ?? []).map(mapGallery);
},
};
type GalleryRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  image: string | null;
  image_path: string | null;
  location: string | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
};

function mapGallery(row: GalleryRow): GalleryItem {
  const image =
    row.image_path
      ? supabase.storage
          .from(BUCKET)
          .getPublicUrl(row.image_path)
          .data.publicUrl
      : "/images/no-image.png";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    category: row.category ?? "",
    location: row.location ?? "",

    image,
    image_path: row.image_path ?? "",

    featured: row.featured ?? false,


    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export { galleryService };