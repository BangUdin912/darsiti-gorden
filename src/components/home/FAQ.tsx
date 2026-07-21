"use client";

import { useState } from "react";

import ConsultationModal from "@/components/contact/ConsultationModal";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Gorden Custom",
  description:
    "Temukan jawaban mengenai harga, pemasangan, survey, pilihan bahan, perawatan, dan proses pemesanan gorden custom Darsiti Gorden.",
};

const faqs = [
  {
    q: "Apakah bisa custom ukuran sesuai ruangan?",
    a: "Ya, semua gorden kami dibuat custom sesuai ukuran dan kondisi ruangan Anda agar hasilnya presisi dan rapi.",
  },
  {
    q: "Berapa lama proses pengerjaan gorden?",
    a: "Rata-rata pengerjaan membutuhkan 3–7 hari kerja tergantung jenis bahan dan tingkat kerumitan desain.",
  },
  {
    q: "Apakah tersedia layanan pemasangan?",
    a: "Ya, kami menyediakan layanan antar dan pemasangan langsung ke lokasi Anda oleh tim profesional.",
  },
  {
    q: "Apakah bisa konsultasi sebelum order?",
    a: "Tentu, kami menyediakan konsultasi gratis untuk membantu Anda memilih bahan, warna, dan model yang tepat.",
  },
  {
    q: "Apakah ada garansi jika hasil tidak sesuai?",
    a: "Kami berkomitmen memberikan hasil terbaik. Jika ada ketidaksesuaian, akan kami bantu solusi sampai sesuai ekspektasi.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Pertanyaan yang Sering Diajukan
            </h2>

            <p className="mt-4 text-muted-foreground">
              Berikut beberapa hal yang sering
              ditanyakan oleh pelanggan sebelum
              melakukan pemesanan.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-stone-50"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      openIndex === index
                        ? null
                        : index
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
                >
                  <span>{item.q}</span>

                  <span className="text-xl">
                    {openIndex === index
                      ? "−"
                      : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </div>
                )}
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