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
    <div
      className="
        fixed inset-0 z-[9999]
        overflow-y-auto
        bg-black/90
        backdrop-blur-sm
        p-4
      "
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="
          fixed top-4 right-4 z-50
          rounded-full
          bg-white/20
          p-2.5
          text-white
          transition
          hover:bg-white/30
          sm:top-6 sm:right-6 sm:p-3
        "
      >
        <X size={22} />
      </button>

      {/* Previous */}
      {items.length > 1 && (
        <button
          onClick={onPrev}
          className="
            fixed left-3 top-1/2 z-40
            -translate-y-1/2
            rounded-full
            bg-white/20
            p-2
            text-white
            transition
            hover:bg-white/30
            sm:left-6 sm:p-3
          "
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={onNext}
          className="
            fixed right-3 top-1/2 z-40
            -translate-y-1/2
            rounded-full
            bg-white/20
            p-2
            text-white
            transition
            hover:bg-white/30
            sm:right-6 sm:p-3
          "
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div
        className="
          mx-auto
          flex
          min-h-full
          w-full
          max-w-7xl
          items-center
          justify-center
          py-6
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            gap-5
            lg:flex-row
            lg:gap-8
          "
        >
          {/* IMAGE */}
          <div
            className="
              relative
              h-[320px]
              w-full
              overflow-hidden
              rounded-3xl
              bg-black
              sm:h-[500px]
              lg:h-[700px]
              lg:flex-[2]
            "
          >
            <Image
              src={item.image || "/images/no-image.png"}
              alt={item.name}
              fill
              priority
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* INFORMATION */}
          <div
            className="
              w-full
              max-h-[45vh]
              overflow-y-auto
              rounded-3xl
              bg-white
              p-5
              sm:p-8
              lg:max-h-[700px]
              lg:max-w-md
            "
          >
            {/* Category */}
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {item.category}
            </span>

            {/* Featured */}
            {item.featured && (
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  Featured
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              {item.name}
            </h2>

            {/* Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Tag
                  size={18}
                  className="text-amber-500"
                />
                <span>{item.category}</span>
              </div>

              {item.color && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Palette
                    size={18}
                    className="text-indigo-500"
                  />
                  <span>{item.color}</span>
                </div>
              )}

              {item.feature && (
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-green-600"
                  />
                  <span>{item.feature}</span>
                </div>
              )}

              {item.price ? (
                <div className="pt-2 text-2xl font-bold text-amber-500">
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
              ) : (
                <div className="pt-2 text-lg font-semibold text-gray-400">
                  Hubungi Kami
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Deskripsi
              </h3>

              <p className="leading-7 text-gray-600">
                {item.description || "-"}
              </p>
            </div>

            {/* Counter */}
            <div className="mt-8 rounded-2xl bg-gray-100 p-4">
              <p className="text-sm text-gray-600">
                Material {currentIndex + 1} dari {items.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}