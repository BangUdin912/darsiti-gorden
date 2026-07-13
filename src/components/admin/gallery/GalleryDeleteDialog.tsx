"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

import type { GalleryItem } from "@/types/gallery";
import { galleryService } from "@/lib/galleryService";

interface GalleryDeleteDialogProps {
  item: GalleryItem;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GalleryDeleteDialog({
  item,
  onClose,
  onSuccess,
}: GalleryDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      /**
       * Delete gallery beserta image di storage
       */
      await galleryService.delete(item.id);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus gallery."
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
              Hapus Gallery
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
            Apakah kamu yakin ingin menghapus gallery:
          </p>

          <p className="font-semibold text-stone-800">
            {item.title}
          </p>

          <p className="text-xs text-stone-400">
            Tindakan ini tidak bisa dibatalkan.
          </p>

          {/* ACTION */}
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