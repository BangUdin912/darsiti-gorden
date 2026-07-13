"use client";

import { useState } from "react";
import Link from "next/link";

import ConsultationModal from "@/components/contact/ConsultationModal";

export default function Footer() {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <footer className="bg-stone-900 text-white">
        <div className="container mx-auto px-6 py-16">

          {/* Grid */}
          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold">
                Darsiti Gorden
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                Spesialis gorden custom premium untuk rumah,
                hotel, kantor, dan masjid. Mengutamakan
                kualitas, presisi, dan kepuasan pelanggan.
              </p>
            </div>

            {/* Navigasi */}
            <div>
              <h3 className="mb-4 font-semibold">
                Navigasi
              </h3>

              <ul className="space-y-2 text-sm text-stone-300">
                <li>
                  <Link href="/">Home</Link>
                </li>

                <li>
                  <Link href="/about">
                    About
                  </Link>
                </li>

                <li>
                  <Link href="/products">
                    Produk
                  </Link>
                </li>

                <li>
                  <Link href="/material">
                    Material
                  </Link>
                </li>

                <li>
                  <Link href="/gallery">
                    Gallery
                  </Link>
                </li>

                <li>
                  <Link href="/contact">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            {/* Layanan */}
            <div>
              <h3 className="mb-4 font-semibold">
                Layanan
              </h3>

              <ul className="space-y-2 text-sm text-stone-300">
                <li>Gorden Custom</li>
                <li>Instalasi Profesional</li>
                <li>Konsultasi Interior</li>
                <li>Survey Lokasi</li>
                <li>Desain & Pengukuran</li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="mb-4 font-semibold">
                Kontak
              </h3>

              <p className="text-sm text-stone-300">
                Purwokerto, Jawa Tengah
              </p>

              <p className="mt-2 text-sm text-stone-300">
                WhatsApp: 6281915118782
              </p>

              <button
                type="button"
                onClick={() =>
                  setOpenConsultation(true)
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5D] hover:shadow-lg"
              >
                Chat WhatsApp
              </button>
            </div>

          </div>

          {/* Divider */}
          <div className="mt-12 flex flex-col items-center justify-between border-t border-stone-700 pt-6 text-sm text-stone-400 md:flex-row">

            <p>
              © {new Date().getFullYear()} Darsiti Gorden.
              All rights reserved.
            </p>

            <p className="mt-2 md:mt-0">
              Created by Nur Khoerudin
            </p>

          </div>

        </div>
      </footer>

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