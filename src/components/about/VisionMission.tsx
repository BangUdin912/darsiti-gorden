"use client";

import { Eye, Target, CheckCircle2 } from "lucide-react";

const missions = [
  "Menyediakan produk gorden berkualitas dengan pilihan bahan yang lengkap.",
  "Memberikan pelayanan yang ramah, profesional, dan responsif kepada setiap pelanggan.",
  "Menghadirkan solusi interior yang elegan sesuai kebutuhan rumah maupun bisnis.",
  "Menjamin proses produksi dan pemasangan yang rapi, tepat waktu, dan terpercaya.",
  "Terus berinovasi mengikuti tren desain interior modern tanpa mengurangi kualitas.",
];

export default function VisionMission() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Visi & Misi
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Komitmen Kami untuk
            <span className="text-[#D4AF37]"> Pelayanan Terbaik</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Kami percaya bahwa kualitas produk harus diiringi dengan pelayanan
            terbaik. Oleh karena itu, setiap langkah kami selalu berorientasi
            pada kepuasan pelanggan.
          </p>

        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Vision */}
          <div className="rounded-3xl border bg-background p-10 shadow-sm transition duration-300 hover:shadow-xl">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
              <Eye className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <h3 className="mb-6 text-3xl font-bold">
              Visi
            </h3>

            <p className="text-lg leading-9 text-muted-foreground">
              Menjadi penyedia gorden terpercaya di Indonesia yang dikenal
              karena kualitas produk, pelayanan profesional, inovasi desain,
              serta mampu memberikan nilai terbaik bagi setiap pelanggan,
              baik untuk kebutuhan rumah tinggal maupun proyek komersial.
            </p>

          </div>

          {/* Mission */}
          <div className="rounded-3xl border bg-background p-10 shadow-sm transition duration-300 hover:shadow-xl">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
              <Target className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <h3 className="mb-6 text-3xl font-bold">
              Misi
            </h3>

            <div className="space-y-5">

              {missions.map((mission, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#D4AF37]" />

                  <p className="leading-8 text-muted-foreground">
                    {mission}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}