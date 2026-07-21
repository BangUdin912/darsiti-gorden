"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { useGallery } from "@/hook/useGallery";
import type { GalleryItem } from "@/types/gallery";

export default function GalleryPreview() {
  const { galleries, loading } = useGallery({
    featuredOnly: true,
    limit: 6,
  });

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

const getImage = (item: GalleryItem) =>
  item.image || "/images/no-image.png";

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">

          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Hasil Pemasangan Kami
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Lihat berbagai hasil pemasangan gorden terbaik kami.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 auto-rows-[230px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse rounded-3xl bg-stone-200 ${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : ""
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  if (!galleries.length) {
    return (
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold lg:text-5xl">
            Hasil Pemasangan Kami
          </h2>

          <p className="mt-4 text-muted-foreground">
            Belum ada project yang tersedia.
          </p>

        </div>
      </section>
    );
  }

  const hero = galleries[0];
  const others = galleries.slice(1);

  return (
    <>
      <section className="bg-white py-24">

        <div className="container mx-auto px-6">

          {/* Header */}

          <div className="mb-14 text-center">

            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Gallery Project
            </span>

            <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
              Hasil Pemasangan Kami
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Berbagai project pemasangan gorden yang telah
              kami selesaikan untuk rumah, hotel,
              kantor, villa, apartemen hingga masjid.
            </p>

          </div>

          {/* Gallery */}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 auto-rows-[230px]">

            {/* Hero */}

            {hero && (
  <Link
    href={`/gallery/${hero.slug}`}
    className="group relative col-span-2 row-span-2 overflow-hidden rounded-[32px] shadow-xl"
  >
                <Image
                  src={getImage(hero)}
                  alt={hero.title}
                  fill
                  sizes="(max-width:768px)100vw,66vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100">

                  <div className="absolute bottom-6 left-6">

                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Featured Project
                    </span>

                    <h3 className="mt-3 text-3xl font-bold text-white">
                      {hero.title}
                    </h3>

                    {hero.location && (
                      <div className="mt-2 flex items-center gap-2 text-stone-200">

                        <MapPin size={16} />

                        <span>{hero.location}</span>

                      </div>
                    )}

                  </div>

                </div>

              </Link>
            )}

            {/* Others */}

            {others.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.slug}`}
                className="group relative overflow-hidden rounded-3xl shadow-md"
              >
                <Image
                  src={getImage(item)}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px)50vw,33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">

                  <div className="absolute bottom-4 left-4">

                    <h3 className="line-clamp-2 font-semibold text-white">
                      {item.title}
                    </h3>

                    {item.location && (
                      <div className="mt-1 flex items-center gap-2 text-sm text-stone-200">

                        <MapPin size={14} />

                        <span className="line-clamp-1">
                          {item.location}
                        </span>

                      </div>
                    )}

                  </div>

                </div>

              </Link>
            ))}

          </div>

          {/* CTA */}

          <div className="mt-16 text-center">

            <Link
              href="/gallery"
              className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
            >
              Lihat Semua Project

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/* Lightbox */}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <div className="relative">

            <Image
              src={selectedImage}
              alt="Gallery"
              width={1600}
              height={1000}
              className="max-h-[90vh] w-auto rounded-3xl object-contain"
            />

          </div>
        </div>
      )}
    </>
  );
}