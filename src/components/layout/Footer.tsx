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
  <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 gap-10 border-b border-stone-800 pb-12 sm:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div className="lg:pr-6">
        <h2 className="text-2xl font-bold">
          Darsiti Gorden
        </h2>

        <p className="mt-4 text-sm leading-7 text-stone-300">
          Spesialis gorden custom premium untuk rumah,
          hotel, kantor, masjid, apartemen, dan berbagai
          kebutuhan interior lainnya.
        </p>
      </div>

      {/* Navigasi */}
      <div>
        <h3 className="mb-5 text-lg font-semibold">
          Navigasi
        </h3>

        <ul className="space-y-3 text-sm text-stone-300">

          <li>
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="transition hover:text-white"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="transition hover:text-white"
            >
              Produk
            </Link>
          </li>

          <li>
            <Link
              href="/material"
              className="transition hover:text-white"
            >
              Material
            </Link>
          </li>

          <li>
            <Link
              href="/gallery"
              className="transition hover:text-white"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Kontak
            </Link>
          </li>

        </ul>
      </div>

      {/* Layanan */}
      <div>
        <h3 className="mb-5 text-lg font-semibold">
          Layanan
        </h3>

        <ul className="space-y-3 text-sm text-stone-300">

          <li>Gorden Custom</li>
          <li>Instalasi Profesional</li>
          <li>Konsultasi Interior</li>
          <li>Survey & Pengukuran</li>
          <li>Desain Interior</li>

        </ul>
      </div>

      {/* Kontak */}
      <div>
        <h3 className="mb-5 text-lg font-semibold">
          Hubungi Kami
        </h3>

        <div className="space-y-3 text-sm text-stone-300">

          <p>Purwokerto, Jawa Tengah</p>

          <p>WhatsApp</p>

          <p className="font-medium text-white">
            +62 819-1511-8782
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setOpenConsultation(true)
          }
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#25D366]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#1EBE5D]
            hover:shadow-lg
            sm:w-auto
          "
        >
          Chat WhatsApp
        </button>
      </div>

    </div>

    {/* Bottom */}
    <div
      className="
        mt-8
        flex
        flex-col
        items-center
        gap-3
        text-center
        text-sm
        text-stone-400
        lg:flex-row
        lg:justify-between
        lg:text-left
      "
    >
      <p>
        © {new Date().getFullYear()} Darsiti Gorden.
        All rights reserved.
      </p>

      <p>
        Created with ❤️ by Nur Khoerudin
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