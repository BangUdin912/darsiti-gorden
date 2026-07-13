"use client";

import {
  MessageCircle,
  MapPinned,
  Ruler,
  Scissors,
  Hammer,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Konsultasi",
    description:
      "Sampaikan kebutuhan, konsep ruangan, dan jenis gorden yang Anda inginkan. Tim kami siap memberikan rekomendasi terbaik.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Survey Lokasi",
    description:
      "Kami melakukan survey langsung ke lokasi untuk memahami kondisi ruangan dan kebutuhan pemasangan.",
    icon: MapPinned,
  },
  {
    number: "03",
    title: "Pengukuran",
    description:
      "Pengukuran dilakukan secara presisi agar hasil jahitan dan pemasangan sesuai dengan ukuran ruangan.",
    icon: Ruler,
  },
  {
    number: "04",
    title: "Produksi",
    description:
      "Gorden diproduksi menggunakan bahan pilihan dengan proses pengerjaan yang rapi dan berkualitas.",
    icon: Scissors,
  },
  {
    number: "05",
    title: "Pemasangan",
    description:
      "Tim profesional melakukan pemasangan dengan rapi, cepat, dan memastikan hasil sesuai harapan pelanggan.",
    icon: Hammer,
  },
];

export default function WorkProcess() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Proses Kerja
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Mudah, Cepat &
            <span className="text-[#D4AF37]"> Profesional</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Kami menerapkan proses kerja yang terstruktur agar setiap proyek
            berjalan lancar, mulai dari konsultasi hingga pemasangan selesai.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Garis desktop */}
          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-yellow-200 lg:block" />

          <div className="grid gap-10 lg:grid-cols-5">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >
                  {/* Garis mobile */}
                  <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-yellow-200 lg:hidden" />

                  {/* Circle */}
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37] shadow-lg">

                    <Icon className="h-9 w-9 text-white" />

                  </div>

                  {/* Number */}
                  <span className="mt-6 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 text-2xl font-semibold">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}