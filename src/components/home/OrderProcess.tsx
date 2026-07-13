"use client";

import { useState } from "react";

import {
  MessageCircleMore,
  Ruler,
  Scissors,
  Hammer,
} from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

const steps = [
  {
    number: "01",
    icon: MessageCircleMore,
    title: "Konsultasi WhatsApp",
    description:
      "Hubungi kami melalui WhatsApp dan ceritakan kebutuhan Anda. Tim kami akan membantu memberikan rekomendasi model, bahan, warna, serta estimasi biaya yang sesuai dengan kebutuhan dan anggaran Anda.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Survey & Pemilihan Bahan",
    description:
      "Tim kami melakukan survey lokasi dan pengukuran langsung agar ukuran gorden presisi. Anda juga dapat memilih bahan, warna, dan model yang paling sesuai dengan konsep ruangan.",
  },
  {
    number: "03",
    icon: Scissors,
    title: "Proses Jahit",
    description:
      "Setelah ukuran dan desain disetujui, gorden diproduksi menggunakan bahan pilihan dan dijahit secara rapi oleh tenaga yang berpengalaman dengan kontrol kualitas pada setiap tahap.",
  },
  {
    number: "04",
    icon: Hammer,
    title: "Pemasangan",
    description:
      "Tim kami datang ke lokasi untuk memasang gorden dengan rapi dan presisi. Setelah selesai, Anda dapat langsung menikmati ruangan yang lebih nyaman, indah, dan elegan.",
  },
];

export default function OrderProcess() {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Proses Pemesanan
            </span>

            <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
              Cara Pemesanan Gorden
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Kami membuat proses pemesanan menjadi mudah dan transparan,
              mulai dari konsultasi hingga gorden terpasang rapi di rumah,
              kantor, hotel, maupun tempat usaha Anda.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-stone-200 lg:block" />

            <div className="space-y-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const reverse = index % 2 === 1;

                return (
                  <div
                    key={step.number}
                    className={`grid items-center gap-8 lg:grid-cols-2 ${
                      reverse
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }`}
                  >
                    {/* Card */}
                    <div className="rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
                          {step.number}
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon size={28} />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-8 text-muted-foreground">
                        {step.description}
                      </p>

                      {index === 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenConsultation(true)
                          }
                          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:scale-105"
                        >
                          Mulai Konsultasi
                        </button>
                      )}
                    </div>

                    {/* Timeline Circle */}
                    <div className="relative hidden justify-center lg:flex">
                      <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-lg font-bold text-white shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-[32px] bg-primary px-8 py-10 text-center text-white">
            <h3 className="text-3xl font-bold">
              Siap Memasang Gorden Impian Anda?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-stone-300">
              Mulailah dengan konsultasi gratis. Tim kami akan membantu
              memilih model, bahan, dan ukuran terbaik sesuai kebutuhan
              ruangan Anda.
            </p>

            <button
              type="button"
              onClick={() =>
                setOpenConsultation(true)
              }
              className="inline-flex rounded-full bg-yellow-400 px-10 py-4 font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
            >
              Konsultasi Gratis Sekarang
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