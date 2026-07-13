"use client";

import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";

import type { Material } from "@/types/material";
import { materialService } from "@/lib/materialService";

interface Props {
  material: Material;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MaterialDeleteDialog({
  material,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      // Hapus data dari database
      await materialService.delete(material.id);

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus bahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-stone-800">
              Hapus Bahan
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8">

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <p className="text-center text-stone-700">
            Apakah Anda yakin ingin menghapus bahan berikut?
          </p>

          <p className="mt-3 text-center text-xl font-semibold text-red-600">
            {material.name}
          </p>

          <p className="mt-4 text-center text-sm text-stone-500">
            Seluruh data bahan ini akan dihapus secara permanen.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-stone-300 px-5 py-2 font-medium hover:bg-stone-100 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Hapus
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}