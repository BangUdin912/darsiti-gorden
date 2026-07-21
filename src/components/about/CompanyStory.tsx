"use client";

import Image from "next/image";
import Badge from "@/components/common/Badge";
import {
  CheckCircle2,
  Award,
  Users,
  Sofa,
} from "lucide-react";

const highlights = [
  "Menggunakan bahan berkualitas premium.",
  "Pengerjaan rapi oleh tenaga berpengalaman.",
  "Gratis konsultasi, survey, dan pengukuran.",
  "Solusi gorden untuk rumah hingga proyek komersial.",
];

export default function CompanyStory() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Image */}
          <div className="relative">

            <Image
              src="/images/gallery/gordenn5.jpg"
              alt="Darsiti Gorden"
              width={700}
              height={800}
              className="rounded-[32px] object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-8 left-8 rounded-3xl bg-white p-6 shadow-2xl">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                  <Award className="h-7 w-7 text-[#D4AF37]" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#D4AF37]">
                    Terpercaya
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Melayani berbagai kebutuhan interior
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Content */}
          <div>

            <div className="flex flex-wrap gap-3">

  <Badge variant="warning">
    Tentang Darsiti Gorden
  </Badge>

</div>

            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Menghadirkan Gorden Berkualitas untuk
              <span className="text-[#D4AF37]"> Ruangan yang Lebih Elegan</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Darsiti Gorden hadir sebagai penyedia solusi interior yang
              mengutamakan kualitas, kenyamanan, dan estetika. Kami melayani
              pembuatan serta pemasangan berbagai jenis gorden dengan pilihan
              bahan, warna, dan model yang dapat disesuaikan dengan karakter
              setiap ruangan.
            </p>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Mulai dari rumah tinggal, apartemen, kantor, hotel, villa,
              sekolah, hingga masjid, kami berkomitmen memberikan pelayanan
              profesional mulai dari konsultasi, survey, pengukuran,
              produksi, hingga pemasangan yang rapi dan tepat waktu.
            </p>

            {/* Highlights */}
            <div className="mt-8 space-y-4">

              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-[#D4AF37]" />

                  <p className="text-muted-foreground">
                    {item}
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