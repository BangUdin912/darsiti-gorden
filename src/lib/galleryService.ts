import { supabase } from "@/lib/supabaseClient";
import { storageService } from "./storage";
import type { GalleryItem } from "@/types/gallery";

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

    return data ?? [];
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

    return data ?? [];
  },

  /**
   * GET FEATURED
   */
  async getFeatured(
  limit = 6
): Promise<GalleryItem[]> {

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("featured", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "[galleryService.getFeatured]",
      error.message
    );
    return [];
  }

  return data ?? [];
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
  async getActive(
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
      "[galleryService.getActive]",
      error.message
    );
    return [];
  }

  return data ?? [];
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

  return data;
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

    return data;
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

    return data;
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
    const payload: Partial<GalleryItem> = {
      ...item,
    };

    if (item.title) {
      const current =
        await galleryService.getById(id);

      if (
        current &&
        current.title !== item.title
      ) {
        payload.slug =
          await generateUniqueSlug(
            item.title
          );
      }
    }

    const { data, error } = await supabase
      .from("gallery")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "[galleryService.update]",
        error
      );
      throw error;
    }

    return data;
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
    const gallery =
      await galleryService.getById(id);

    if (!gallery) return;

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "[galleryService.delete]",
        error
      );
      throw error;
    }

    if (gallery.image_path?.trim()) {
      await storageService.remove(
        gallery.image_path
      );
    }
  },
};

export { galleryService };