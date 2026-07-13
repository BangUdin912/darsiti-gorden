"use client";

import Modal from "@/components/common/Modal";
import ConsultationForm from "./ConsultationForm";

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
  service?: string;
  material?: string;
}

export default function ConsultationModal({
  open,
  onClose,
  productName,
  service,
  material,
}: ConsultationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Konsultasi Darsiti Gorden"
      width="lg"
    >
      <div className="mx-auto max-w-4xl">
        {/* Deskripsi */}
        <div className="mb-8 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-600">
            Silakan lengkapi data di bawah ini terlebih dahulu. Setelah data
            berhasil dikirim, Anda akan langsung diarahkan ke WhatsApp untuk
            melanjutkan konsultasi dengan tim Darsiti Gorden.
          </p>
        </div>

        {/* Form */}
        <ConsultationForm
    productName={productName}
    material={material}
    service={service}
    onSuccess={() => {
        setTimeout(() => {
            onClose();
        }, 300);
    }}
/>
      </div>
    </Modal>
  );
}