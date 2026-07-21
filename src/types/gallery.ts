export interface GalleryItem {
  id: string;

  slug: string;

  title: string;

  description: string;

  category: string;

  location: string;


  image: string;

  image_path: string;


  featured: boolean;


  created_at: string;

  updated_at: string;
}

/**
 * Data untuk membuat gallery baru
 */
export interface CreateGalleryInput {
  title: string;

  category: string;

  location: string;

  description: string;

  image: string;

  image_path: string;

  featured?: boolean;

  is_active?: boolean;
}

/**
 * Data untuk update gallery
 */
export interface UpdateGalleryInput
  extends Partial<CreateGalleryInput> {}

/**
 * Form State
 */
export interface GalleryFormData {
  title: string;

  category: string;

  location: string;

  description: string;

  featured: boolean;

  is_active: boolean;
}

/**
 * Response upload image
 */
export interface GalleryUploadResult {
  url: string;

  path: string;
}

/**
 * Digunakan untuk Create & Update Gallery
 */
export interface GalleryFormValues {
  title: string;

  category: string;

  location: string;

  description: string;

  image: string;

  image_path: string;

  featured: boolean;

  is_active: boolean;
}