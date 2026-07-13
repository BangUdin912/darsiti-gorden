"use client";

import { FormEvent, useEffect, useState, useMemo } from "react";

import Image from "next/image";

import type {
    Material,
    CreateMaterial,
} from "@/types/material";

import { materialService } from "@/lib/materialService";
import { storageService } from "@/lib/storage";

interface Props {
    initialValues?: Material;

    submitText?: string;

    onSuccess?: () => void;

    onCancel?: () => void;
}

const categories = [
    "Blackout",
    "Lokal",
    "Vitrase",
    "Blind",
] as const;

export default function MaterialForm({
  initialValues,
  submitText = "Simpan Bahan",
  onSuccess,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [category, setCategory] =
    useState<(typeof categories)[number]>("Blackout");

  const [color, setColor] = useState("");

  const [description, setDescription] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [image, setImage] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  /**
   * Preview gambar
   */
  const previewImage = useMemo(() => {
    if (!file) return image;

    return URL.createObjectURL(file);
  }, [file, image]);

  /**
   * Bersihkan object URL
   */
  useEffect(() => {
    return () => {
      if (
        file &&
        previewImage &&
        previewImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, file]);

  /**
   * Isi form saat edit
   */
  useEffect(() => {
    if (!initialValues) return;

    setName(initialValues.name);
    setCategory(initialValues.category);
    setColor(initialValues.color ?? "");
    setDescription(initialValues.description ?? "");
    setFeatured(initialValues.featured);
    setImage(initialValues.image);
  }, [initialValues]);

  /**
   * Slug otomatis dari nama
   */
  const slug = useMemo(() => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }, [name]);

    async function handleSubmit(
        e: FormEvent
    ) {
        e.preventDefault();

        try {
            if (!name.trim()) {
                alert("Nama bahan wajib diisi.");
                return;
            }

            if (!slug.trim()) {
                alert("Slug wajib diisi.");
                return;
            }

            if (!image && !file) {
                alert("Silakan upload gambar.");
                return;
            }
            setLoading(true);

            let imageUrl = image;

            if (file) {
                // Hapus gambar lama jika edit
                if (initialValues?.image) {
                    const oldPath = initialValues.image.split("/").pop();

                    if (oldPath) {
                        try {
                            await storageService.remove(oldPath, "materials");
                        } catch (error) {
                            console.warn("Gagal menghapus gambar lama", error);
                        }
                    }
                }

                const upload = await storageService.upload(
                    file,
                    "materials"
                );

                imageUrl = upload.url;
            }

            const payload: CreateMaterial = {
                name,
                slug,
                category,
                image: imageUrl,
                description,
                
                color,
                
                featured,
               
            };

            if (initialValues) {
                await materialService.update(
                    initialValues.id,
                    payload
                );
            } else {
                await materialService.create(
                    payload
                );
            }

            onSuccess?.();
        } catch (err) {
            console.error(err);

            alert("Gagal menyimpan data.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="grid gap-6 md:grid-cols-2">
            {/* Nama */}

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Nama Bahan
                </label>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="w-full rounded-xl border border-stone-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    required
                
                placeholder="isi nama bahan yang digunakan..."/>
            </div>

            {/* Slug */}


            {/* Kategori */}

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Kategori
                </label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value as typeof category
                        )
                    }
                    className="w-full rounded-xl border border-stone-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                >
                    {categories.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {/* Harga */}



            {/* Warna */}

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Warna
                </label>

                <input
                    value={color}
                    onChange={(e) =>
                        setColor(e.target.value)
                    }
                    className="w-full rounded-xl border border-stone-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                
                placeholder="isi warna yang digunakan..."/>
            </div>

            {/* Feature */}



            {/* Deskripsi */}

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Deskripsi
                </label>

                <textarea
                    rows={5}
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full rounded-xl border border-stone-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                placeholder="isi deskripsi tentang bahan yang digunakan..."
                />
            </div>

            {/* Upload */}

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Gambar
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files?.[0] ?? null)
                    }
                    className="block w-full text-sm
  file:mr-4
  file:rounded-lg
  file:border-0
  file:bg-amber-100
  file:px-4
  file:py-2
  file:font-medium
  file:text-amber-700
  hover:file:bg-amber-200"
                />
            </div>

            {/* Preview */}

            {previewImage && (
                <div className="relative h-56 w-56 overflow-hidden rounded-xl border">

                    <Image
                        src={previewImage}
                        alt={name}
                        fill
                        unoptimized
                        className="object-cover"
                    />

                </div>
            )}

            {/* Featured */}

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4"
                />

                Featured
            </label>

           
</div>
            {/* Button */}

            <div className="flex justify-end gap-3 pt-4">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-stone-300 px-6 py-3 font-medium hover:bg-stone-100"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                >
                    {loading ? "Menyimpan..." : submitText}
                </button>

            </div>
            
        </form>

    );
}