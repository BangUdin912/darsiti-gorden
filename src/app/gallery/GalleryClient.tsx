"use client";

import { useEffect, useMemo, useState } from "react";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

import { galleryService } from "@/lib/galleryService";
import type { GalleryItem } from "@/types/gallery";

export default function GalleryClient() {
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
        console.error(
          "Failed to load gallery:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const filteredGallery = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return gallery.filter((item) => {
      const categories = Array.isArray(item.category)
        ? item.category
        : [item.category];

      const matchCategory =
        category === "Semua" ||
        categories.includes(category);

      const matchSearch =
        item.title
          .toLowerCase()
          .includes(keyword) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.location ?? "")
          .toLowerCase()
          .includes(keyword) ||
        categories
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [gallery, search, category]);

  function openLightbox(index: number) {
    setCurrentIndex(index);
    setIsOpen(true);
  }

  function prevImage() {
    setCurrentIndex((prev) =>
      prev === 0
        ? filteredGallery.length - 1
        : prev - 1
    );
  }

  function nextImage() {
    setCurrentIndex((prev) =>
      prev === filteredGallery.length - 1
        ? 0
        : prev + 1
    );
  }

  return (
    <>
      <PageHeader
        title="Galeri Pemasangan"
        description="Lihat berbagai hasil pemasangan gorden yang telah kami kerjakan untuk rumah, kantor, hotel, apartemen, sekolah, hingga berbagai proyek interior lainnya."
        image="/images/gallery/gordenn2.jpg"
        breadcrumb={[
          {
            label: "Galeri",
          },
        ]}
      />

      {/* Search */}
      <section className="border-b bg-stone-50 py-8">
        <Container>
          <input
            type="search"
            placeholder="Cari galeri..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-stone-200
              bg-white
              px-5
              text-sm
              shadow-sm
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />
        </Container>
      </section>

      {/* Filter */}
      <GalleryFilter
        products={gallery}
        current={category}
        onSelect={setCategory}
      />

      {/* Count */}
      <section className="bg-white py-8">
        <Container>
          <p className="text-stone-600">
            Menampilkan{" "}
            <span className="font-semibold text-primary">
              {filteredGallery.length}
            </span>{" "}
            proyek pemasangan.
          </p>
        </Container>
      </section>

      {/* Gallery */}
      {loading ? (
        <div className="py-24 text-center">
          <div
            className="
              mx-auto
              mb-5
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-primary
              border-t-transparent
            "
          />

          <p className="text-stone-500">
            Memuat galeri...
          </p>
        </div>
      ) : filteredGallery.length === 0 ? (
        <Container className="pb-20">
          <div className="rounded-3xl border-2 border-dashed border-stone-200 bg-white py-20 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-stone-700">
              Galeri Tidak Ditemukan
            </h3>

            <p className="mt-3 text-stone-500">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
          </div>
        </Container>
      ) : (
        <>
          <GalleryGrid
            items={filteredGallery}
            onOpen={openLightbox}
          />

          <GalleryLightbox
            items={filteredGallery}
            currentIndex={currentIndex}
            isOpen={isOpen}
            onClose={() =>
              setIsOpen(false)
            }
            onPrev={prevImage}
            onNext={nextImage}
          />
        </>
      )}
    </>
  );
}