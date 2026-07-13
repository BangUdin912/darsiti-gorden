"use client";

import { X } from "lucide-react";

import MaterialForm from "./MaterialForm";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function MaterialCreate({
  onClose,
  onSuccess,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold text-stone-800">
              Tambah Bahan
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Tambahkan bahan gorden baru.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-stone-100"
          >
            <X className="h-6 w-6" />
          </button>

        </div>

        {/* Form */}
        <div className="max-h-[80vh] overflow-y-auto p-6">

          <MaterialForm
            submitText="Simpan Bahan"
            onSuccess={onSuccess}
          />

        </div>

      </div>

    </div>
  );
}