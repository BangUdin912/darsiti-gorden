"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Save } from "lucide-react";

import { messageService } from "@/lib/messageService";
import type { Message } from "@/types/message";

interface MessageEditProps {
    message: Message;
    onClose: () => void;
    onSuccess: () => void;
}

export default function MessageEdit({
    message,
    onClose,
    onSuccess,
}: MessageEditProps) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",

        productName: "",
        customProduct: "",

        service: "",
        customService: "",

        message: "",

        status: "new" as Message["status"],
    });

    useEffect(() => {
        if (!message) return;

        const products = [
            "Blackout",
            "Lokal",
            "Vitrase",
            "Blind",
        ];

        const services = [
            "Rumah",
            "Apartemen",
            "Kantor",
            "Hotel",
            "Masjid",
            "Sekolah",
        ];

        setForm({
            name: message.name,
            phone: message.phone,
            email: message.email ?? "",
            address: message.address ?? "",

            productName: products.includes(message.productName ?? "")
                ? message.productName!
                : message.productName
                    ? "Lainnya"
                    : "",

            customProduct: products.includes(message.productName ?? "")
                ? ""
                : message.productName ?? "",

            service: services.includes(message.service ?? "")
                ? message.service!
                : message.service
                    ? "Lainnya"
                    : "",

            customService: services.includes(message.service ?? "")
                ? ""
                : message.service ?? "",

            message: message.message,

            status: message.status,
        });
    }, [message]);
    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const selectedProduct =
            form.productName === "Lainnya"
                ? form.customProduct
                : form.productName;

        const selectedService =
            form.service === "Lainnya"
                ? form.customService
                : form.service;

        try {
            setLoading(true);

            await messageService.update(message.id, {
                name: form.name,
                phone: form.phone,
                email: form.email,
                address: form.address,
                productName: selectedProduct,
                service: selectedService,
                message: form.message,
            });

            await messageService.updateStatus(
                message.id,
                form.status
            );

            alert("Pesan berhasil diperbarui.");

            onSuccess();
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui pesan.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-2xl font-bold">
                        Edit Pesan
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-stone-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form
    onSubmit={handleSubmit}
    className="max-h-[calc(90vh-90px)] overflow-y-auto space-y-5 p-6"
>

    <div className="grid gap-5 md:grid-cols-2">

        {/* Nama */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Nama
            </label>

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
                required
            />
        </div>

        {/* WhatsApp */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                WhatsApp
            </label>

            <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
                required
            />
        </div>

        {/* Email */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Email
            </label>

            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
                placeholder="contoh@email.com"
            />
        </div>

        {/* Alamat */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Alamat
            </label>

            <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Masukkan alamat pelanggan"
                className="w-full rounded-xl border p-3"
            />
        </div>

        {/* Produk */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Produk
            </label>

            <select
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            >
                <option value="">Pilih Produk</option>
                <option value="Blackout">Blackout</option>
                <option value="Lokal">Lokal</option>
                <option value="Vitrase">Vitrase</option>
                <option value="Blind">Blind</option>
                <option value="Lainnya">Lainnya</option>
            </select>

            {form.productName === "Lainnya" && (
                <input
                    name="customProduct"
                    value={form.customProduct}
                    onChange={handleChange}
                    placeholder="Masukkan nama produk..."
                    className="mt-3 w-full rounded-xl border p-3"
                />
            )}
        </div>

        {/* Jenis Proyek */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Jenis Proyek
            </label>

            <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            >
                <option value="">Pilih Jenis Proyek</option>
                <option value="Rumah">Rumah</option>
                <option value="Apartemen">Apartemen</option>
                <option value="Kantor">Kantor</option>
                <option value="Hotel">Hotel</option>
                <option value="Masjid">Masjid</option>
                <option value="Sekolah">Sekolah</option>
                <option value="Lainnya">Lainnya</option>
            </select>

            {form.service === "Lainnya" && (
                <input
                    name="customService"
                    value={form.customService}
                    onChange={handleChange}
                    placeholder="Masukkan jenis proyek..."
                    className="mt-3 w-full rounded-xl border p-3"
                />
            )}
        </div>

        {/* Status */}

        <div>
            <label className="mb-2 block text-sm font-semibold">
                Status
            </label>

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            >
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="done">Done</option>
            </select>
        </div>

    </div>

    {/* Pesan */}

    <div>
        <label className="mb-2 block text-sm font-semibold">
            Pesan
        </label>

        <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
        />
    </div>

    {/* Tombol */}

    <div className="flex justify-end gap-3 border-t pt-5">

        <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-6 py-3 hover:bg-stone-100"
        >
            Batal
        </button>

        <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
        >
            {loading ? (
                <>
                    <Loader2
                        className="animate-spin"
                        size={18}
                    />
                    Menyimpan...
                </>
            ) : (
                <>
                    <Save size={18} />
                    Simpan
                </>
            )}
        </button>

    </div>

</form>
            </div>

        </div>
    );
}