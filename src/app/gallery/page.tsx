"use client";

import { useEffect, useMemo, useState } from "react";

import { galleryService } from "@/lib/galleryService";
import { GalleryItem } from "@/types/gallery";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await galleryService.getAll();
        setGallery(data);
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const filteredGallery = useMemo(() => {
  const keyword = search.toLowerCase().trim();

  return gallery.filter((item) => {
    const categories = Array.isArray(item.category)
      ? item.category
      : [item.category];

    const matchCategory =
      category === "Semua" ||
      categories.includes(category);

    const matchSearch =
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword) ||
      categories.join(" ").toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });
}, [gallery, search, category]);

  function openLightbox(index: number) {
    setCurrentIndex(index);
    setIsOpen(true);
  }

  function prevImage() {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredGallery.length - 1 : prev - 1
    );
  }

  function nextImage() {
    setCurrentIndex((prev) =>
      prev === filteredGallery.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <>
      <GalleryHero />

      {/* SEARCH */}
      <section className="border-b bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <input
            type="text"
            placeholder="Cari galeri..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </section>

      {/* FILTER */}
<GalleryFilter
  products={gallery}
  current={category}
  onSelect={setCategory}
/>

      {/* COUNT */}
      <section className="container mx-auto max-w-7xl px-4 py-8">
        <p className="text-gray-600">
          Menampilkan{" "}
          <span className="font-semibold text-amber-600">
            {filteredGallery.length}
          </span>{" "}
          proyek
        </p>
      </section>

      {/* LOADING */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Memuat galeri...
        </div>
      ) : (
        <>
          {/* GRID */}
          <GalleryGrid
            items={filteredGallery}
            onOpen={openLightbox}
          />

          {/* LIGHTBOX */}
          <GalleryLightbox
            items={filteredGallery}
            currentIndex={currentIndex}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onPrev={prevImage}
            onNext={nextImage}
          />
        </>
      )}
    </>
  );
}