"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import ConsultationModal from "@/components/contact/ConsultationModal";

export default function Hero() {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/backgrounds/gordenn2.jpg"
          alt="Darsiti Gorden"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

        {/* Decorative Blur */}
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

        {/* Content */}
        <div className="relative container mx-auto flex min-h-[92vh] items-center px-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
              ⭐ Spesialis Gorden Custom Purwokerto
            </span>

            {/* Heading */}
            <h1 className="mt-8 text-5xl font-bold leading-tight text-white lg:text-7xl">
              Gorden Premium
              <span className="block text-amber-400">
                untuk Rumah yang Lebih Elegan
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-200">
              Darsiti Gorden melayani pembuatan,
              pemasangan, hingga laundry gorden untuk
              rumah, hotel, kantor, apartemen, dan
              masjid dengan hasil yang rapi, elegan,
              dan berkualitas.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-yellow-400 px-8 py-4 font-semibold text-stone-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-2xl"
              >
                Lihat Produk
              </Link>

              <button
                type="button"
                onClick={() =>
                  setOpenConsultation(true)
                }
                className="rounded-full border border-white bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-stone-900 hover:shadow-xl"
              >
                Konsultasi Gratis
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/90">
              <div>✔ 500+ Pemasangan</div>
              <div>✔ 10+ Tahun Pengalaman</div>
              <div>✔ Free Survey Lokasi</div>
              <div>✔ Laundry Gorden</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Konsultasi */}
      <ConsultationModal
        open={openConsultation}
        onClose={() =>
          setOpenConsultation(false)
        }
        service="Konsultasi"
      />
    </>
  );
}