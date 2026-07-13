"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils/formatPrice";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  MessageCircle,
  Star,
} from "lucide-react";

import type { Product } from "@/types/product";

import ConsultationModal from "@/components/contact/ConsultationModal";

interface Props {
  product: Product;
}

export default function ProductDetail({
  product,
}: Props) {
  const [openConsultation, setOpenConsultation] =
    useState(false);

  return (
    <>
      <section className="bg-gradient-to-b from-stone-50 via-white to-stone-100 py-20">
        <div className="container mx-auto max-w-7xl px-6">

          {/* Back */}
          <Link
            href="/products"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-amber-600"
          >
            <ArrowLeft size={18} />
            Kembali ke Produk
          </Link>

          <div className="grid items-start gap-16 lg:grid-cols-2">

            {/* IMAGE */}
            <div>

              <div className="relative aspect-square overflow-hidden rounded-[32px] bg-white shadow-2xl">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition duration-500 hover:scale-105"
                />

                {product.featured && (
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    Featured
                  </div>
                )}

              </div>

            </div>

            {/* CONTENT */}
            <div>

              <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                Produk Gorden
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-stone-900">
                {product.name}
              </h1>

              {product.short_description && (
                <p className="mt-5 text-xl font-medium text-amber-700">
                  {product.short_description}
                </p>
              )}

              {product.description && (
                <p className="mt-6 text-lg leading-8 text-stone-600">
                  {product.description}
                </p>
              )}

              {/* PRICE */}
              {product.price && (
                <div className="mt-10 border-b border-stone-200 pb-8">

                  <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
                    Harga Mulai
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-amber-600">
                    {formatPrice(product.price)}
                  </h2>

                </div>
              )}

              {/* CATEGORY */}
              <div className="mt-8">

                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-stone-900">
                  <Layers3 className="h-6 w-6 text-amber-600" />
                  Kategori
                </h3>

                <div className="flex flex-wrap gap-3">

                  {product.category.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              {/* KEUNGGULAN */}
              <div className="mt-12">

                <h3 className="mb-6 text-xl font-bold">
                  Keunggulan Produk
                </h3>

                <div className="grid gap-4">

                  {[
                    "Menggunakan bahan premium",
                    "Jahitan rapi dan kuat",
                    "Bisa custom ukuran",
                    "Gratis survey lokasi",
                    "Pemasangan profesional",
                    "Garansi pemasangan",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="text-green-600" />

                      <span>{item}</span>

                    </div>
                  ))}

                </div>

              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-wrap gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setOpenConsultation(true)
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#20bc5a]"
                >
                  <MessageCircle size={20} />
                  Konsultasi via WhatsApp
                </button>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-2xl border border-stone-300 bg-white px-8 py-4 font-semibold transition hover:border-amber-500 hover:text-amber-600"
                >
                  Produk Lain
                  <ArrowRight size={18} />
                </Link>

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
        productName={product.name}
        service="Konsultasi"
      />
    </>
  );
}