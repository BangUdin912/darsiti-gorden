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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">

          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            Proses Kerja
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Mudah, Cepat &
            <span className="text-amber-500">
              {" "}Profesional
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Kami menerapkan proses kerja yang terstruktur agar setiap proyek
            berjalan lancar, mulai dari konsultasi hingga pemasangan selesai.
          </p>

        </div>

        <div className="relative">

          {/* Desktop Line */}
          <div className="absolute left-0 right-0 top-10 hidden h-1 rounded-full bg-amber-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-5">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (

                <div
                  key={step.number}
                  className="relative"
                >

                  {/* Mobile Timeline */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-8 top-16 h-full w-0.5 bg-amber-200 lg:hidden" />
                  )}

                  <div className="flex gap-5 lg:block lg:text-center">

                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 lg:mx-auto">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 shadow-lg transition duration-300 hover:scale-105">

                        <Icon className="h-7 w-7 text-white" />

                      </div>

                    </div>

                    {/* Content */}
                    <div className="pb-10 lg:pb-0">

                      <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 sm:text-sm lg:mt-6">
                        {step.number}
                      </span>

                      <h3 className="mt-3 text-xl font-bold text-stone-900 lg:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                        {step.description}
                      </p>

                    </div>

                  </div>

                </div>

              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}