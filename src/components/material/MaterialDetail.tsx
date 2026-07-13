"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  Palette,
  Star,
  Tag,
  MessageCircle,
} from "lucide-react";

import type { Material } from "@/types/material";

import MaterialLightbox from "./MaterialLightbox";
import ConsultationModal from "@/components/contact/ConsultationModal";

interface Props {
  material: Material;
}

export default function MaterialDetail({
  material,
}: Props) {
  const [openImage, setOpenImage] =
    useState(false);

  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="bg-gradient-to-b from-stone-50 via-white to-stone-100 py-20">
        <div className="container mx-auto max-w-7xl px-6">

          {/* Back */}
          <Link
            href="/material"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-amber-600"
          >
            <ArrowLeft size={18} />
            Kembali ke Material
          </Link>

          <div className="grid items-start gap-16 lg:grid-cols-2">

            {/* IMAGE */}
            <div>

              <button
                onClick={() => setOpenImage(true)}
                className="relative aspect-square w-full overflow-hidden rounded-[32px] bg-white shadow-2xl"
              >
                <Image
                  src={
                    material.image ||
                    "/images/no-image.png"
                  }
                  alt={material.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition duration-500 hover:scale-105"
                />

                {material.featured && (
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    Featured
                  </div>
                )}
              </button>

            </div>

            {/* CONTENT */}
            <div>

              <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                Material Gorden
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-stone-900">
                {material.name}
              </h1>

              {material.description && (
                <p className="mt-6 text-lg leading-8 text-stone-600">
                  {material.description}
                </p>
              )}

              {/* PRICE */}
              <div className="mt-8">

                <span className="text-sm text-gray-500">
                  Harga Mulai
                </span>

                <h2 className="text-3xl font-bold text-amber-600">
                  {material.price
                    ? `Rp ${material.price.toLocaleString(
                        "id-ID"
                      )}`
                    : "Hubungi Kami"}
                </h2>

              </div>

              {/* INFORMASI */}
              <div className="mt-10">

                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Layers3 className="text-amber-600" />
                  Informasi Material
                </h3>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <Tag
                      className="text-blue-600"
                      size={18}
                    />
                    <span>{material.category}</span>
                  </div>

                  {material.color && (
                    <div className="flex items-center gap-3">
                      <Palette
                        className="text-amber-600"
                        size={18}
                      />
                      <span>{material.color}</span>
                    </div>
                  )}

                </div>

              </div>

              
              {/* KEUNGGULAN */}
              <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

                <h3 className="mb-6 text-xl font-bold">
                  Keunggulan Material
                </h3>

                <div className="space-y-4">

                  {material.feature ? (
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 text-green-600" />

                      <span className="leading-7">
                        {material.feature}
                      </span>
                    </div>
                  ) : (
                    <>
                      {[
                        "Material berkualitas premium",
                        "Awet dan tahan lama",
                        "Pilihan warna lengkap",
                        "Mudah dibersihkan",
                        "Jahitan presisi",
                        "Cocok untuk rumah maupun kantor",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2 className="text-green-600" />

                          <span>{item}</span>
                        </div>
                      ))}
                    </>
                  )}

                </div>

              </div>

              {/* BUTTON */}
              <div className="mt-12 flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    setOpenConsultation(true)
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#20bc5a]"
                >
                  <MessageCircle size={20} />
                  Konsultasi via WhatsApp
                </button>

                <Link
                  href="/material"
                  className="inline-flex items-center gap-2 rounded-2xl border border-stone-300 bg-white px-8 py-4 font-semibold transition hover:border-amber-500 hover:text-amber-600"
                >
                  Material Lain
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      <MaterialLightbox
        items={[material]}
        currentIndex={0}
        isOpen={openImage}
        onClose={() => setOpenImage(false)}
        onPrev={() => {}}
        onNext={() => {}}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        open={openConsultation}
        onClose={() =>
          setOpenConsultation(false)
        }
        material={material.name}
        service="Konsultasi"
      />
    </>
  );
}