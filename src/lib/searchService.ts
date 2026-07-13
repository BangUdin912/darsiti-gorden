import { supabase } from "@/lib/supabaseClient";
import type {
  GlobalSearchResult,
  SearchResult,
} from "@/types/search";

const SEARCH_LIMIT = 5;

class SearchService {
  /**
   * Global Search
   */
  async search(
    keyword: string
  ): Promise<GlobalSearchResult> {
    const query = keyword.trim();

    if (!query) {
      return {
        keyword: "",
        total: 0,
        results: [],
      };
    }

    try {
      const [
        products,
        materials,
        galleries,
      ] = await Promise.all([
        this.searchProducts(query),
        this.searchMaterials(query),
        this.searchGalleries(query),
      ]);

      const results = [
        ...products,
        ...materials,
        ...galleries,
      ].sort((a, b) => {
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }

        return a.title.localeCompare(b.title);
      });

      return {
        keyword: query,
        total: results.length,
        results,
      };
    } catch (error) {
      console.error(
        "Global Search:",
        error
      );

      return {
        keyword: query,
        total: 0,
        results: [],
      };
    }
  }

  /**
   * Product
   */
  private async searchProducts(
    keyword: string
  ): Promise<SearchResult[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        slug,
        name,
        short_description,
        description,
        image,
        created_at
      `)
      .eq("is_active", true)
      .or(
        `name.ilike.%${keyword}%,short_description.ilike.%${keyword}%,description.ilike.%${keyword}%`
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(SEARCH_LIMIT);

    if (error) {
      console.error(
        "Search Product:",
        error
      );
      return [];
    }

    return (
      data?.map((item) => ({
        id: item.id,
        type: "product",
        title: item.name,
        description:
          item.short_description ??
          item.description ??
          "",
        slug: item.slug,
        image: item.image,
        href: `/product/${item.slug}`,
      })) ?? []
    );
  }

  /**
   * Material
   */
  private async searchMaterials(
    keyword: string
  ): Promise<SearchResult[]> {
    const { data, error } = await supabase
      .from("materials")
      .select(`
        id,
        slug,
        name,
        category,
        description,
        feature,
        image,
        created_at
      `)
      .eq("is_active", true)
      .or(
        `name.ilike.%${keyword}%,category.ilike.%${keyword}%,description.ilike.%${keyword}%,feature.ilike.%${keyword}%`
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(SEARCH_LIMIT);

    if (error) {
      console.error(
        "Search Material:",
        error
      );
      return [];
    }

    return (
      data?.map((item) => ({
        id: item.id,
        type: "material",
        title: item.name,
        description:
          item.description ??
          item.feature ??
          "",
        slug: item.slug,
        image: item.image,
        href: `/material/${item.slug}`,
      })) ?? []
    );
  }

  /**
   * Gallery
   */
  private async searchGalleries(
    keyword: string
  ): Promise<SearchResult[]> {
    const { data, error } = await supabase
      .from("gallery")
      .select(`
        id,
        slug,
        title,
        category,
        location,
        description,
        image_url,
        created_at
      `)
      .or(
        `title.ilike.%${keyword}%,category.ilike.%${keyword}%,location.ilike.%${keyword}%,description.ilike.%${keyword}%`
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(SEARCH_LIMIT);

    if (error) {
      console.error(
        "Search Gallery:",
        error
      );
      return [];
    }

    return (
      data?.map((item) => ({
        id: item.id,
        type: "gallery",
        title: item.title,
        description:
          item.location ??
          item.description ??
          "",
        slug: item.slug,
        image: item.image_url,
        href: `/gallery/${item.slug}`,
      })) ?? []
    );
  }
}

export const searchService =
  new SearchService();