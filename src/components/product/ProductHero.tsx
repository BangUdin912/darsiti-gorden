"use client";

import Image from "next/image";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductHero({
  value,
  onChange,
}: Props) {
  return (
    <section className="relative overflow-hidden py-20">

      {/* Background */}
      <Image
        src="/images/gallery/gordenn2.jpg"
        alt="Produk Darsiti Gorden"
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
            Produk
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-200 md:text-xl">
            Temukan koleksi
            <span className="font-semibold text-white">
              {" "}gorden premium Darsiti Gorden
            </span>
            {" "}dengan berbagai pilihan bahan, warna, dan model untuk rumah,
            kantor, hotel, apartemen, sekolah hingga masjid.
          </p>

        </div>

        

      </div>

    </section>
  );
}