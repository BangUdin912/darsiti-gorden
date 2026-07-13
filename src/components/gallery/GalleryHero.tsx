"use client";

import Image from "next/image";

export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden py-20">

      {/* Background Image */}
      <Image
        src="/images/gallery/gordenn2.jpg"
        alt="Gallery Darsiti Gorden"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative container mx-auto max-w-7xl px-4">

        <div className="mx-auto max-w-4xl text-center">

          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Gallery
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-200 md:text-xl">
            Lihat berbagai hasil pemasangan gorden berkualitas dari
            <span className="font-semibold text-white">
              {" "}Darsiti Gorden
            </span>
            {" "}untuk rumah, kantor, hotel, apartemen, sekolah,
            hingga masjid.
          </p>

        </div>

      </div>

    </section>
  );
}