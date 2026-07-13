"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

import ProductUpload from "./ProductUpload";

const categories = [
    "Blackout",
    "Lokal",
    "Vitrase",
    "Blind",
];

interface ProductFormProps {
    initialValues?: Partial<Product>;
    submitText?: string;
    onSuccess?: () => void;
}

export default function ProductForm({
    initialValues,
    submitText = "Simpan Product",
    onSuccess,
}: ProductFormProps) {
    const router = useRouter();

    const isEdit = Boolean(initialValues?.id);

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");

    const [category, setCategory] = useState<string[]>([
        categories[0],
    ]);

    const [price, setPrice] = useState("");

    const [description, setDescription] =
        useState("");

    const [featured, setFeatured] =
        useState(false);

    const [file, setFile] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    /**
     * ======================
     * LOAD DATA EDIT
     * ======================
     */

    useEffect(() => {
        if (!initialValues) return;

        setName(initialValues.name ?? "");

        setCategory(
            initialValues.category ?? [categories[0]]
        );

        setPrice(initialValues.price ?? "");

        setDescription(
            initialValues.description ?? ""
        );

        setFeatured(
            initialValues.featured ?? false
        );

        setPreview(initialValues.image ?? "");

        setFile(null);
    }, [initialValues]);

    /**
     * ======================
     * CLEANUP BLOB URL
     * ======================
     */

    useEffect(() => {
        return () => {
            if (preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleFileChange(file: File | null) {
        setFile(file);

        if (preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    function removeImage() {
        if (preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setPreview("");
        setFile(null);
    }

    function resetForm() {
        setName("");

        setCategory([categories[0]]);

        setPrice("");

        setDescription("");

        setFeatured(false);

        setPreview("");

        setFile(null);
    }

    /**
     * ======================
     * SUBMIT
     * ======================
     */

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const safeName = name.trim();

        const safePrice = price.trim();

        const safeDescription =
            description.trim();

        if (!safeName) {
            return alert(
                "Nama product wajib diisi."
            );
        }

        if (!safePrice) {
            return alert(
                "Harga wajib diisi."
            );
        }

        if (!safeDescription) {
            return alert(
                "Deskripsi wajib diisi."
            );
        }

        if (!isEdit && !file) {
            return alert(
                "Silakan upload gambar."
            );
        }

        try {
            setLoading(true);

            let image =
                initialValues?.image ?? "";

            /**
             * Upload gambar baru
             */

            if (file) {

                /**
                 * Hapus gambar lama
                 */

                if (
                    isEdit &&
                    initialValues?.image
                ) {
                    try {
                        const path =
                            decodeURIComponent(
                                initialValues.image.split(
                                    "/product-images/"
                                )[1] ?? ""
                            );

                        if (path) {
                            await productService.deleteImage(
                                path
                            );
                        }
                    } catch (err) {
                        console.warn(err);
                    }
                }

                const upload =
                    await productService.uploadImage(
                        file
                    );

                image = upload.url;
            }

            const payload = {

                name: safeName,

                short_description:
                    safeDescription.substring(
                        0,
                        120
                    ),

                description: safeDescription,

                image,

                category,

                type: "product",

                featured,

                price: safePrice,

                seo_title: safeName,

                seo_description:
                    safeDescription.substring(
                        0,
                        150
                    ),

                is_active: true,
            };

            if (
                isEdit &&
                initialValues?.id
            ) {

                await productService.update(
                    initialValues.id,
                    payload
                );

                alert(
                    "Product berhasil diperbarui."
                );

            } else {

                await productService.create(
                    payload
                );

                alert(
                    "Product berhasil ditambahkan."
                );

                resetForm();
            }

            router.refresh();

            onSuccess?.();

        } catch (err: any) {

            console.error(err);

            alert(
                err.message ??
                "Terjadi kesalahan."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <ProductUpload
                preview={preview}
                loading={loading}
                onFileChange={handleFileChange}
                onRemove={removeImage}
            />

            <label className="mb-2 block text-sm font-semibold">
                    Nama Product
                </label>
            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Nama Product"
            />

            <label className="mb-2 block text-sm font-semibold">
                    Kategori
                </label>
            <select
                value={category[0]}
                onChange={(e) =>
                    setCategory([e.target.value])
                }
                disabled={loading}
                className="w-full rounded-xl border px-4 py-3"
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

            <label className="mb-2 block text-sm font-semibold">
                Harga
            </label>
            <input
                value={price}
                onChange={(e) =>
                    setPrice(e.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Harga"
            />

            <label className="mb-2 block text-sm font-semibold">
                    Deskripsi
                </label>
            <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
                disabled={loading}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Deskripsi"
            />

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) =>
                        setFeatured(
                            e.target.checked
                        )
                    }
                />

                Featured Product
            </label>

            <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
            >
                {loading
                    ? "Loading..."
                    : submitText}
            </button>

        </form>
    );
}