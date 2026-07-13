"use client";

import { useState } from "react";

import type { Material } from "@/types/material";

import MaterialCard from "./MaterialCard";
import MaterialLightbox from "./MaterialLightbox";

interface Props {
  materials: Material[];
}

export default function MaterialGrid({
  materials,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function openPreview(index: number) {
    setCurrentIndex(index);
    setIsOpen(true);
  }

  function closePreview() {
    setIsOpen(false);
  }

  function prevImage() {
    setCurrentIndex((prev) =>
      prev === 0 ? materials.length - 1 : prev - 1
    );
  }

  function nextImage() {
    setCurrentIndex((prev) =>
      prev === materials.length - 1 ? 0 : prev + 1
    );
  }

  if (materials.length === 0) {
    return (
      <section className="pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-72 items-center justify-center rounded-3xl border-2 border-dashed border-stone-200 bg-white">
            <p className="text-stone-500">
              Material tidak ditemukan.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-20">
        <div className="container mx-auto max-w-7xl px-4">

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
              Koleksi Material
            </h2>

            <p className="mt-3 max-w-2xl text-stone-500">
              Temukan berbagai pilihan bahan gorden berkualitas untuk
              rumah, kantor, hotel, apartemen, sekolah, dan berbagai
              kebutuhan interior lainnya.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {materials.map((material, index) => (
              <MaterialCard
                key={material.id}
                material={material}
                onPreview={() => openPreview(index)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <MaterialLightbox
        items={materials}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={closePreview}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}