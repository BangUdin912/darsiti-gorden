"use client";

import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Tag,
} from "lucide-react";

import { GalleryItem } from "@/types/gallery";

interface Props {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: Props) {
  if (!isOpen) return null;

  const item = items[currentIndex];

  // Mencegah error jika data belum ada
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <X size={24} />
      </button>

      {/* Previous */}
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <ChevronRight size={30} />
      </button>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 lg:flex-row">

        {/* Image */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-3xl bg-black lg:h-[700px] lg:flex-[2]">

          <Image
            src={item.image_url || "/images/placeholder.jpg"}
            alt={item.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width:1024px) 100vw, 70vw"
          />

        </div>

        {/* Information */}
        <div className="w-full rounded-3xl bg-white p-8 lg:max-w-md">

          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            {item.category}
          </span>

          <h2 className="mt-6 text-3xl font-bold">
            {item.title}
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3 text-gray-700">
              <Tag className="text-amber-600" size={18} />
              <span>{item.category}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-red-500" size={18} />
              <span>{item.location}</span>
            </div>

          </div>

          <div className="mt-8 border-t pt-8">

            <h3 className="mb-4 text-lg font-semibold">
              Deskripsi
            </h3>

            <p className="leading-8 text-gray-600">
              {item.description}
            </p>

          </div>

          <div className="mt-10 rounded-2xl bg-stone-100 p-5">

            <p className="text-sm text-gray-600">
              Foto {currentIndex + 1} dari {items.length}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}