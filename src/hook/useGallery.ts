"use client";

import { useEffect, useState } from "react";

import { galleryService } from "@/lib/galleryService";
import type { GalleryItem } from "@/types/gallery";

interface UseGalleryOptions {
  limit?: number;
  featuredOnly?: boolean;
}

export function useGallery({
  limit = 6,
  featuredOnly = false,
}: UseGalleryOptions = {}) {
  const [galleries, setGalleries] = useState<
    GalleryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = featuredOnly
          ? await galleryService.getFeatured(
              limit
            )
          : await galleryService.getActive(
              limit
            );

        setGalleries(data ?? []);
      } catch (err) {
        console.error(err);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit, featuredOnly]);

  return {
    galleries,
    loading,
  };
}