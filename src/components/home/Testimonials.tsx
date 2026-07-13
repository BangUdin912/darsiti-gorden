"use client";

import { useState } from "react";

import ConsultationModal from "@/components/contact/ConsultationModal";

const testimonials = [
  {
    name: "Ibu Ratna",
    role: "Pemilik Rumah",
    location: "Purwokerto",
    text: "Hasil pemasangan sangat rapi dan sesuai desain interior rumah saya.",
    rating: 5,
  },
  {
    name: "Bapak Andi",
    role: "Manager Hotel",
    location: "Banyumas",
    text: "Kualitas bahan premium dan pemasangan cepat untuk hotel kami.",
    rating: 5,
  },
  {
    name: "Takmir Masjid",
    role: "Pengurus Masjid",
    location: "Purbalingga",
    text: "Gorden masjid terlihat jauh lebih elegan dan rapi.",
    rating: 5,
  },
  {
    name: "Pak Dedi",
    role: "Owner Rumah",
    location: "Ajibarang",
    text: "Proses cepat dan hasil sesuai ekspektasi saya.",
    rating: 5,
  },
  {
    name: "Ibu Sari",
    role: "Interior Client",
    location: "Purwokerto",
    text: "Pelayanan sangat ramah dan hasil sangat memuaskan.",
    rating: 5,
  },
  {
    name: "Pak Hendra",
    role: "Perumahan Developer",
    location: "Banyumas",
    text: "Sangat cocok untuk proyek perumahan kami, hasil konsisten.",
    rating: 5,
  },
];

export default function TestimonialFlexible() {
  const isSmallSet = testimonials.length <= 3;

  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="bg-stone-50 py-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Apa Kata Pelanggan Kami
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Ratusan pelanggan telah mempercayakan proyek
              gorden mereka kepada kami.
            </p>
          </div>

          {/* GRID */}
          <div
            className={`grid gap-6 ${
              isSmallSet
                ? "mx-auto max-w-5xl md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Rating */}
                <div className="mb-3 flex gap-1">
                  {Array.from({
                    length: t.rating,
                  }).map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Text */}
                <p className="leading-relaxed text-stone-700">
                  "{t.text}"
                </p>

                {/* User */}
                <div className="mt-5">
                  <h4 className="font-semibold">
                    {t.name}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={() =>
                setOpenConsultation(true)
              }
              className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
            >
              Konsultasi Sekarang
            </button>
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