"use client";

import Image from "next/image";

export default function MaterialHero() {
  return (
    <section className="relative overflow-hidden py-20">

      {/* Background */}
      <Image
        src="/images/gallery/gordenn2.jpg"
        alt="Material Darsiti Gorden"
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
            Material
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-200 md:text-xl">
            Pilih berbagai
            <span className="font-semibold text-white">
              {" "}material gorden berkualitas
            </span>
            {" "}yang sesuai dengan kebutuhan rumah, kantor, hotel,
            apartemen, sekolah, maupun masjid. Tersedia pilihan
            <span className="font-semibold text-white">
              {" "}Blackout, Lokal, Vitrase,
            </span>
            {" "}dan
            <span className="font-semibold text-white">
              {" "}Blind
            </span>
            {" "}dengan beragam warna, tekstur, dan karakteristik.
          </p>

        </div>

      </div>

    </section>
  );
}