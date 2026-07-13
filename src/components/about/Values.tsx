"use client";

import {
  ShieldCheck,
  BriefcaseBusiness,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integritas",
    description:
      "Kami mengutamakan kejujuran, transparansi, dan komitmen dalam setiap proses, mulai dari konsultasi hingga pemasangan.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Profesional",
    description:
      "Setiap proyek dikerjakan oleh tenaga berpengalaman dengan standar kerja yang rapi, tepat waktu, dan bertanggung jawab.",
  },
  {
    icon: Sparkles,
    title: "Inovatif",
    description:
      "Kami terus mengikuti tren desain interior serta menghadirkan pilihan bahan dan model gorden yang modern dan berkualitas.",
  },
  {
    icon: HeartHandshake,
    title: "Kepuasan Pelanggan",
    description:
      "Kepuasan pelanggan adalah prioritas utama. Kami selalu memberikan solusi terbaik sesuai kebutuhan dan anggaran.",
  },
];

export default function Values() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Nilai Perusahaan
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Nilai yang Menjadi
            <span className="text-[#D4AF37]"> Landasan Kami</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Darsiti Gorden berkomitmen memberikan produk dan pelayanan terbaik
            melalui nilai-nilai yang menjadi pedoman dalam setiap pekerjaan
            dan hubungan dengan pelanggan.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">

                  <Icon className="h-8 w-8 text-[#D4AF37] group-hover:text-white" />

                </div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-semibold">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="leading-8 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}