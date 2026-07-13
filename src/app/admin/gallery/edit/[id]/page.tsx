import { notFound } from "next/navigation";

import GalleryForm from "@/components/admin/gallery/GalleryForm";
import { galleryService } from "@/lib/galleryService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGalleryPage({ params }: Props) {
  const { id } = await params;

  const gallery = await galleryService.getById(id);

  if (!gallery) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Gallery
      </h1>

      <GalleryForm
        initialValues={gallery}
        submitText="Update Gallery"
      />
    </div>
  );
}