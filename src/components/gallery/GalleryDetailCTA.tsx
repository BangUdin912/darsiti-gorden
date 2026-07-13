"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

interface GalleryDetailCTAProps {
  projectTitle: string;
}

export default function GalleryDetailCTA({
  projectTitle,
}: GalleryDetailCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

        <h3 className="text-xl font-semibold text-stone-900">
          Tertarik dengan hasil seperti ini?
        </h3>

        <p className="mt-3 leading-7 text-stone-600">
          Konsultasikan kebutuhan gorden rumah, kantor,
          hotel, apartemen maupun tempat usaha Anda.
          Tim kami siap membantu memberikan solusi terbaik.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            <MessageCircle className="h-5 w-5" />
            Konsultasi WhatsApp
          </button>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
          >
            Lihat Project Lain
          </Link>

        </div>

      </div>

      <ConsultationModal
        open={open}
        onClose={() => setOpen(false)}
        productName={projectTitle}
        service="Konsultasi"
      />
    </>
  );
}