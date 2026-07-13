"use client";

import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Palette,
  CheckCircle2,
  Star,
} from "lucide-react";

import type { Material } from "@/types/material";

interface Props {
  items: Material[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MaterialLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: Props) {
  if (!isOpen) return null;

  const item = items[currentIndex];

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
      {items.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <ChevronRight size={30} />
        </button>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 lg:flex-row">

        {/* IMAGE */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-3xl bg-black lg:h-[700px] lg:flex-[2]">

          <Image
            src={item.image || "/images/no-image.png"}
            alt={item.name}
            fill
            priority
            unoptimized
            className="object-contain"
            sizes="(max-width:1024px)100vw,70vw"
          />

        </div>

        {/* INFORMATION */}
        <div className="w-full rounded-3xl bg-white p-8 lg:max-w-md">

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {item.category}
          </span>

          {item.featured && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                <Star size={16} fill="currentColor" />
                Featured
              </span>
            </div>
          )}

          <h2 className="mt-6 text-3xl font-bold">
            {item.name}
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3 text-gray-700">
              <Tag
                className="text-amber-600"
                size={18}
              />
              <span>{item.category}</span>
            </div>

            {item.color && (
              <div className="flex items-center gap-3 text-gray-700">
                <Palette
                  className="text-purple-600"
                  size={18}
                />
                <span>{item.color}</span>
              </div>
            )}

            {item.feature && (
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2
                  className="mt-1 text-green-600"
                  size={18}
                />
                <span>{item.feature}</span>
              </div>
            )}

            {item.price ? (
              <div className="text-2xl font-bold text-amber-600">
                Rp {item.price.toLocaleString("id-ID")}
              </div>
            ) : (
              <div className="text-lg font-semibold text-stone-400">
                Hubungi Kami
              </div>
            )}

          </div>

          <div className="mt-8 border-t pt-8">

            <h3 className="mb-4 text-lg font-semibold">
              Deskripsi
            </h3>

            <p className="leading-8 text-gray-600">
              {item.description || "-"}
            </p>

          </div>

          <div className="mt-10 rounded-2xl bg-stone-100 p-5">

            <p className="text-sm text-gray-600">
              Material {currentIndex + 1} dari {items.length}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}