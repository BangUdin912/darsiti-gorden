"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

const benefits = [
  "Gratis Konsultasi",
  "Gratis Survey & Pengukuran",
  "Banyak Pilihan Bahan Premium",
  "Pemasangan Profesional",
];

export default function CTA() {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto px-4">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#5D4037] via-[#795548] to-[#8D6E63] px-8 py-16 shadow-2xl md:px-16">

            {/* Background */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">

              {/* LEFT */}
              <div>

                <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur">
                  Konsultasi Gratis
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                  Siap Mempercantik
                  <br />
                  <span className="text-yellow-300">
                    Interior Anda?
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-yellow-50">
                  Wujudkan ruangan yang lebih elegan dan nyaman bersama
                  Darsiti Gorden. Tim kami siap membantu mulai dari
                  konsultasi, survey, pengukuran, hingga pemasangan
                  dengan hasil yang rapi dan berkualitas.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">

                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-white" />

                      <span className="text-white">
                        {benefit}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              {/* RIGHT */}
              <div className="rounded-3xl bg-white p-8 shadow-xl">

                <h3 className="text-3xl font-bold">
                  Hubungi Kami Sekarang
                </h3>

                <p className="mt-4 leading-8 text-muted-foreground">
                  Dapatkan rekomendasi model gorden, pilihan bahan,
                  serta estimasi harga yang sesuai dengan kebutuhan Anda.
                </p>

                <div className="mt-8 flex flex-col gap-4">

                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenConsultation(true)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Konsultasi via WhatsApp
                  </button>

                  {/* Product */}
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37] px-6 py-4 text-lg font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-white"
                  >
                    Lihat Katalog Produk

                    <ArrowRight className="h-5 w-5" />
                  </Link>

                </div>

                <div className="mt-8 rounded-2xl bg-yellow-50 p-5">

                  <p className="font-semibold text-[#D4AF37]">
                    Respon Cepat
                  </p>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Tim kami siap membantu menjawab pertanyaan dan
                    memberikan konsultasi pada jam operasional dengan
                    respon yang cepat dan ramah.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        open={openConsultation}
        onClose={() =>
          setOpenConsultation(false)
        }
      />
    </>
  );
}