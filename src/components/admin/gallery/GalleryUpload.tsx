"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

interface GalleryUploadProps {
  preview: string;
  loading?: boolean;
  onFileChange: (file: File | null) => void;
  onRemove?: () => void;
}

export default function GalleryUpload({
  preview,
  loading = false,
  onFileChange,
  onRemove,
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    // IMPORTANT: allow re-select same file
    e.target.value = "";

    if (!file) {
      onFileChange(null);
      return;
    }

    onFileChange(file);
  }

  function handleRemove() {
    onRemove?.();

    // reset file input manually
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">

      <label className="block text-sm font-semibold text-stone-700">
        Foto Gallery
      </label>

      {!preview ? (
        <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 transition hover:border-yellow-500 hover:bg-yellow-50">

          <UploadCloud className="mb-3 h-10 w-10 text-stone-400" />

          <span className="font-medium text-stone-600">
            Klik untuk memilih gambar
          </span>

          <span className="mt-1 text-sm text-stone-400">
            JPG, PNG, WEBP
          </span>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={loading}
            className="hidden"
            onChange={handleChange}
          />
        </label>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border">

          <Image
            src={preview || "/images/placeholder.jpg"}
            alt="Preview"
            width={800}
            height={600}
            className="h-72 w-full object-cover"
          />

          {/* REMOVE BUTTON */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow hover:bg-red-600"
          >
            <X size={18} />
          </button>

          {/* REPLACE IMAGE */}
          <label className="absolute bottom-3 right-3 cursor-pointer rounded-lg bg-black/70 px-4 py-2 text-sm font-medium text-white hover:bg-black">

            Ganti Foto

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              disabled={loading}
              className="hidden"
              onChange={handleChange}
            />
          </label>

        </div>
      )}
    </div>
  );
}