import { GalleryItem } from "@/types/gallery";
import { galleryService } from "@/lib/galleryService";

/**
 * Ambil semua gallery
 */
export async function getGallery(): Promise<GalleryItem[]> {
  return await galleryService.getAll();
}

/**
 * Ambil gallery unggulan
 */
export async function getFeaturedGallery(): Promise<GalleryItem[]> {
  return await galleryService.getFeatured();
}

/**
 * Ambil gallery berdasarkan slug
 */
export async function getGalleryBySlug(
  slug: string
): Promise<GalleryItem | null> {
  return await galleryService.getBySlug(slug);
}

/**
 * Ambil gallery berdasarkan ID
 */
export async function getGalleryById(
  id: string
): Promise<GalleryItem | null> {
  return await galleryService.getById(id);
}