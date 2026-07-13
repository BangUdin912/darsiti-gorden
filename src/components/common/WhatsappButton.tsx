"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

interface WhatsAppButtonProps {
  productName?: string;

  service?: string;

  material?: string;
}

export default function WhatsAppButton({
  productName,
  service,
  material,
}: WhatsAppButtonProps) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          hidden
          items-center
          gap-2
          rounded-full
          bg-[#25D366]
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#1EBE5D]
          hover:shadow-lg
          lg:flex
        "
      >
        <MessageCircle className="h-5 w-5" />

        Konsultasi
      </button>

      <ConsultationModal
        open={open}
        onClose={() => setOpen(false)}
        productName={productName}
        service={service}
        material={material}
      />
    </>
  );
}