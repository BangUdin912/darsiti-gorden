"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        aria-label="Konsultasi WhatsApp"
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#20bc5a]
        "
      >
        <MessageCircle size={30} />
      </button>

      <ConsultationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}