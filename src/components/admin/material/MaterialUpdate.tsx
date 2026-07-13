"use client";

import type { Material } from "@/types/material";
import MaterialForm from "./MaterialForm";

interface Props {
  material: Material;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MaterialUpdate({
  material,
  onClose,
  onSuccess,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            Update Bahan
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <MaterialForm
            initialValues={material}
            submitText="Update Bahan"
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>

      </div>
    </div>
  );
}