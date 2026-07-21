"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { GalleryItem } from "@/types/gallery";
import { galleryService } from "@/lib/galleryService";
import { storageService } from "@/lib/storage";

import GalleryUpload from "./GalleryUpload";

const categories = ["Rumah", "Kantor", "Hotel", "Apartemen", "Masjid"] as const;

interface GalleryFormProps {
  initialValues?: Partial<GalleryItem>;
  submitText?: string;
  onSuccess?: () => void;
}

export default function GalleryForm({
  initialValues,
  submitText = "Simpan Gallery",
  onSuccess,
}: GalleryFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialValues?.id);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /**
   * SYNC EDIT DATA
   */
  useEffect(() => {
    if (!initialValues) return;

    setTitle(initialValues.title ?? "");
    setCategory(initialValues.category ?? categories[0]);
    setLocation(initialValues.location ?? "");
    setDescription(initialValues.description ?? "");
    setFeatured(initialValues.featured ?? false);
    setPreview(initialValues.image ?? "");
    setFile(null);
  }, [initialValues]);

  /**
   * CLEANUP BLOB
   */
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleFileChange(file: File | null) {
    setFile(file);

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
  }

  function resetForm() {
    setTitle("");
    setCategory(categories[0]);
    setLocation("");
    setDescription("");
    setFeatured(false);
    setFile(null);
    setPreview("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const safeTitle = title.trim();
    const safeLocation = location.trim();
    const safeDesc = description.trim();

    if (!safeTitle) return alert("Judul wajib diisi.");
    if (!safeLocation) return alert("Lokasi wajib diisi.");
    if (!safeDesc) return alert("Deskripsi wajib diisi.");
    if (!isEdit && !file) return alert("Gambar wajib diupload.");

    try {
      setLoading(true);

      let image = initialValues?.image ?? "";
      let image_path = initialValues?.image_path ?? "";

      if (file) {
        // hapus gambar lama jika edit
        if (isEdit && image_path) {
          try {
            await storageService.remove(image_path);
          } catch (err) {
            console.warn("Gagal menghapus gambar lama", err);
          }
        }

        const upload = await storageService.upload(file);

        image = upload.url;
        image_path = upload.path;
      }

      const payload = {
        title: safeTitle,
        category,
        location: safeLocation,
        description: safeDesc,
        featured,
        image,
        image_path,
      };

      if (isEdit && initialValues?.id) {
        await galleryService.update(initialValues.id, payload);
        alert("Gallery berhasil diperbarui.");
      } else {
        await galleryService.create(payload);
        alert("Gallery berhasil ditambahkan.");
        resetForm();
      }

      router.refresh();
      onSuccess?.();

    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <GalleryUpload
        preview={preview}
        loading={loading}
        onFileChange={handleFileChange}
        onRemove={removeImage}
      />

      <label className="mb-2 block text-sm font-semibold">
                    Judul Gallery
                </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        placeholder="Judul Gallery"
      />

      <label className="mb-2 block text-sm font-semibold">
                    Kategori
                </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-semibold">
                    Lokasi
                </label>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        placeholder="Lokasi"
      />

      Deskripsi
      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        placeholder="Deskripsi"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          disabled={loading}
        />
        Featured Gallery
      </label>

      <button
        disabled={loading}
        className="rounded-xl bg-amber-500 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Loading..." : submitText}
      </button>

    </form>
  );
}