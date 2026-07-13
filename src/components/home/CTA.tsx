"use client";

import { useState } from "react";
import Link from "next/link";

import ConsultationModal from "@/components/contact/ConsultationModal";

export default function CTASection() {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-amber-50 py-24">

        {/* Decorative blur */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-amber-200 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary opacity-20 blur-3xl" />

        <div className="relative container mx-auto px-6">

          <div className="mx-auto max-w-3xl text-center">

            {/* Headline */}
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Wujudkan Interior Rumah yang Lebih Elegan Sekarang
            </h2>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-muted-foreground">
              Konsultasikan kebutuhan gorden Anda bersama tim kami.
              Dapatkan rekomendasi terbaik sesuai ruangan,
              gratis tanpa biaya konsultasi.
            </p>

            {/* Benefits */}
            <div className="mt-8 flex flex-col gap-2 text-sm text-stone-700">
              <p>✔ Konsultasi desain & bahan gratis</p>
              <p>✔ Pengerjaan custom sesuai ukuran ruangan</p>
              <p>✔ Layanan antar & pemasangan profesional</p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  setOpenConsultation(true)
                }
                className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
              >
                Konsultasi via WhatsApp
              </button>

              <Link
                href="/products"
                className="rounded-full border border-primary px-10 py-4 font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Lihat Produk
              </Link>

            </div>

            {/* Trust line */}
            <p className="mt-8 text-xs text-muted-foreground">
              Respon cepat • Bisa survey lokasi • Area Purwokerto & sekitarnya
            </p>

          </div>

        </div>

      </section>

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