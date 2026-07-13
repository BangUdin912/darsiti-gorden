import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, MapPin } from "lucide-react";

import { GalleryItem } from "@/types/gallery";

interface Props {
  item: GalleryItem;
  onOpen: () => void;
}

export default function GalleryCard({
  item,
  onOpen,
}: Props) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE */}
      <button
        type="button"
        onClick={onOpen}
        className="relative block h-80 w-full overflow-hidden"
      >
<Image
  src={item.image_url}
  alt={item.title}
  fill
  unoptimized
  className="object-cover transition duration-700 group-hover:scale-110"
/>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category */}
        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow">
            {item.category}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute right-5 top-5 rounded-full bg-white/20 p-3 backdrop-blur">
          <ImageIcon className="h-5 w-5 text-white" />
        </div>

        {/* Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/90 px-5 py-3 font-semibold text-stone-900 shadow-lg">
            Lihat Foto
          </span>
        </div>
      </button>

      {/* CONTENT */}
      <div className="p-6">

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 text-amber-600" />
          <span>{item.location}</span>
        </div>

        <h3 className="mt-3 text-2xl font-bold text-stone-900 transition-colors group-hover:text-amber-600">
          {item.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
          {item.description}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border border-amber-500 px-5 py-2 font-semibold text-amber-600 transition hover:bg-amber-500 hover:text-white"
          >
            Preview
          </button>

          <Link
            href={`/gallery/${item.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-amber-700 transition-all hover:gap-3"
          >
            Lihat Detail
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </div>
    </article>
  );
}