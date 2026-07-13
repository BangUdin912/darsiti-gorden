"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

interface ProductDeleteDialogProps {
  item: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductDeleteDialog({
  item,
  onClose,
  onSuccess,
}: ProductDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      /**
       * DELETE via service (sudah include storage cleanup)
       */
      await productService.delete(item.id);

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

      {/* MODAL */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={18} />
            <h2 className="text-lg font-bold">
              Hapus Product
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-stone-100"
          >
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="space-y-4 p-5">

          <p className="text-sm text-stone-600">
            Apakah kamu yakin ingin menghapus product:
          </p>

          <p className="font-semibold text-stone-800">
            {item.name}
          </p>

          <p className="text-xs text-stone-400">
            Tindakan ini tidak bisa dibatalkan.
          </p>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-4 py-2 hover:bg-stone-100 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Menghapus..." : "Hapus"}
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}