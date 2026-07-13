"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";

interface ProductUploadProps {
  preview: string;
  loading?: boolean;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
}

export default function ProductUpload({
  preview,
  loading = false,
  onFileChange,
  onRemove,
}: ProductUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    if (file) {
      onFileChange(file);
    }
  }

  function handleClickUpload() {
    if (loading) return;
    inputRef.current?.click();
  }

  return (
    <div className="space-y-3">

      <label className="block text-sm font-semibold">
        Gambar Product
      </label>

      {/* PREVIEW AREA */}
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border bg-stone-50">

        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-cover"
            />

            {/* REMOVE BUTTON */}
            {!loading && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              >
                <X size={16} />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-stone-500">
            <Upload size={28} />
            <p className="text-sm">Upload gambar product</p>
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleClickUpload}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {preview ? "Ganti Gambar" : "Upload Gambar"}
        </button>

        {preview && (
          <button
            type="button"
            onClick={onRemove}
            disabled={loading}
            className="rounded-xl border px-4 py-2 hover:bg-stone-100 disabled:opacity-50"
          >
            Hapus
          </button>
        )}
      </div>

      {/* INPUT HIDDEN */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSelectFile}
        className="hidden"
      />
    </div>
  );
}