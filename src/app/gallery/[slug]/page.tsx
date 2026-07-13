import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Tag,
} from "lucide-react";

import { galleryService } from "@/lib/galleryService";
import GalleryDetailCTA from "@/components/gallery/GalleryDetailCTA";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GalleryDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const item = await galleryService.getBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-stone-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Back */}
        <Link
          href="/gallery"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Gallery
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-stone-600">

          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" />
            {item.location}
          </span>

          <span className="inline-flex items-center gap-2">
            <Tag className="h-4 w-4 text-amber-500" />
            {item.category}
          </span>

        </div>

        {/* Image */}
        <div className="relative mt-8 h-[500px] overflow-hidden rounded-3xl shadow-xl">

          <Image
            src={item.image_url}
            alt={item.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

        </div>

        {/* Description */}
        <div className="mt-8 max-w-3xl">

          <h2 className="text-xl font-semibold text-stone-900">
            Deskripsi Project
          </h2>

          <p className="mt-3 leading-8 text-stone-600">
            {item.description}
          </p>

        </div>

        {/* Client CTA */}
        <GalleryDetailCTA
          projectTitle={item.title}
        />

      </div>
    </main>
  );
}