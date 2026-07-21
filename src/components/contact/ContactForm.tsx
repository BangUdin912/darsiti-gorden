"use client";

import { useState } from "react";
import Link from "next/link";
import { messageService } from "@/lib/messageService";


import {
    User,
    Phone,
    Mail,
    Building2,
    MessageSquare,
    Send,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

interface MessageFormProps {
    productName?: string;
}

export default function MessageForm({
    productName = "",
}: MessageFormProps) {
    const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",

    service: "",

    product: "",
    customProduct: "",

    material: "",
customMaterial: "",

    message: productName
        ? `Halo, saya ingin berkonsultasi mengenai produk "${productName}".`
        : "",
});


    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  // Tentukan produk yang akan disimpan
  const selectedProduct =
    form.product === "Lainnya"
      ? form.customProduct.trim()
      : form.product;

 const selectedMaterial =
  form.material === "Lainnya"
    ? form.customMaterial.trim()
    : form.material;

if (!selectedMaterial) {
  alert("Silakan pilih bahan.");
  return;
}

if (
  form.material === "Lainnya" &&
  !form.customMaterial.trim()
) {
  alert("Silakan isi nama bahan.");
  return;
}

  // Validasi
  if (!form.name.trim()) {
    alert("Nama wajib diisi");
    return;
  }

  if (!form.phone.trim()) {
    alert("Nomor WhatsApp wajib diisi");
    return;
  }

  if (!selectedProduct) {
    alert("Silakan pilih produk.");
    return;
  }

  if (
    form.product === "Lainnya" &&
    !form.customProduct.trim()
  ) {
    alert("Silakan isi nama produk.");
    return;
  }

  if (!form.message.trim()) {
    alert("Pesan wajib diisi");
    return;
  }

  try {
    setLoading(true);

    // Simpan ke database
await messageService.create({
    name: form.name,
    phone: form.phone,
    email: form.email,
    address: form.address,
    productName: selectedProduct,
    service: form.service,
    material: selectedMaterial,
    message: form.message,
});

    // Format pesan WhatsApp
const text = `Halo Darsiti Gorden,

Nama : ${form.name}
WhatsApp : ${form.phone}
Email : ${form.email || "-"}
Alamat : ${form.address || "-"}

Jenis Layanan : ${form.service || "-"}

Produk :
${selectedProduct}

Material :
${selectedMaterial}

Pesan :
${form.message}`;

    // Buka WhatsApp
    window.open(
      `https://wa.me/6281915118782?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    // Reset form
setForm({
    name: "",
    phone: "",
    email: "",
    address: "",

    service: "",

    product: "",
    customProduct: "",

    material: "",
customMaterial: "",

    message: "",
});

  } catch (error) {
    console.error(error);
    alert("Pesan gagal dikirim.");
  } finally {
    setLoading(false);
  }
}

    return (
        <section className="bg-stone-50 py-24">
            <div className="container mx-auto max-w-7xl px-4">

                {/* Heading */}

                <div className="mx-auto mb-16 max-w-3xl text-center">



                    <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
                        Konsultasikan
                        <span className="text-amber-600"> Kebutuhan Anda</span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Isi formulir berikut dan tim kami akan membantu memberikan
                        rekomendasi bahan, model gorden hingga estimasi biaya.
                    </p>

                </div>

                <div className="grid items-stretch gap-10 lg:grid-cols-12">

                    {/* LEFT */}

                    <div className="flex lg:col-span-5">

                        <div className="flex h-full w-full flex-col rounded-[32px] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-10 text-white shadow-2xl">

                            <span className="inline-flex rounded-full bg-amber-400/20 px-4 py-1 text-sm font-semibold text-amber-300">
                                Informasi Kontak
                            </span>

                            <h3 className="mt-6 text-3xl font-bold">
                                Darsiti Gorden
                            </h3>

                            <p className="mt-4 leading-8 text-stone-300">
                                Hubungi kami untuk konsultasi, survey lokasi, pemilihan bahan,
                                hingga pemasangan gorden berkualitas.
                            </p>

                            <div className="mt-10 space-y-8">

                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20">
                                        <Phone className="h-6 w-6 text-green-400" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold">WhatsApp</h4>

                                        <Link
                                            href="https://wa.me/6281915118782"
                                            target="_blank"
                                            className="mt-2 block text-stone-300 hover:text-green-400"
                                        >
                                            0819-1511-8782
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20">
                                        <Mail className="h-6 w-6 text-blue-400" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold">Email</h4>

                                        <Link
                                            href="mailto:darsitigordenn@gmail.com"
                                            className="mt-2 block text-stone-300 hover:text-blue-300"
                                        >
                                            darsitigordenn@gmail.com
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20">
                                        <FaInstagram className="h-6 w-6 text-pink-400" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold">Instagram</h4>

                                        <Link
                                            href="https://instagram.com/darsiti_gorden"
                                            target="_blank"
                                            className="mt-2 block text-stone-300 hover:text-pink-400"
                                        >
                                            @darsiti_gorden
                                        </Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="lg:col-span-7">

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[32px] bg-white p-10 shadow-xl"
                        >

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-medium">
                                        <User className="h-4 w-4" />
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                        placeholder="Masukkan nama"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-medium">
                                        <Phone className="h-4 w-4" />
                                        WhatsApp
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-medium">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
    <label className="mb-2 flex items-center gap-2 font-medium">
        <Building2 className="h-4 w-4" />
        Alamat
    </label>

    <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Masukkan alamat lengkap"
        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
    />
</div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-medium">
                                        <Building2 className="h-4 w-4" />
                                        Jenis Layanan
                                    </label>

                                    <select
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                    >
                                        <option value="">Pilih Layanan</option>
  <option>Konsultasi</option>
  <option>Survey Lokasi</option>
  <option>Pemasangan</option>
  <option>Perbaikan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-medium">
                                        <Building2 className="h-4 w-4" />
                                        Produk yang Diminati
                                    </label>

                                    <select
                                        name="product"
                                        value={form.product}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                    >
                                        <option value="">Pilih Produk</option>

                                        <option value="Blackout">Blackout</option>
                                        <option value="Lokal">Lokal</option>
                                        <option value="Vitrase">Vitrase</option>
                                        <option value="Blind">Blind</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>

                                    {form.product === "Lainnya" && (
                                        <input
                                            type="text"
                                            name="customProduct"
                                            value={form.customProduct}
                                            onChange={handleChange}
                                            placeholder="Tuliskan nama produk..."
                                            className="mt-4 w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                        />
                                    )}
                                </div>

                                <div>
  <label className="mb-2 flex items-center gap-2 font-medium">
    <Building2 className="h-4 w-4" />
    Bahan / Material
  </label>

  <select
    name="material"
    value={form.material}
    onChange={handleChange}
    className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
  >
    <option value="">Pilih Material</option>

    <option>Woody</option>
    <option>Canon</option>
    <option>Chealse One</option>
    <option>Oasis</option>
    <option>Audi</option>
    <option>Spring</option>
    <option>Melia</option>
    <option>Fellas</option>
    <option>Alaska</option>
    <option>Dellana</option>
    <option>Einstein</option>
    <option>Coldy</option>

    <option>Aliando</option>
    <option>Nikita</option>
    <option>Wajik</option>

    <option value="Lainnya">Lainnya</option>
  </select>

  {form.material === "Lainnya" && (
    <input
      type="text"
      name="customMaterial"
      value={form.customMaterial}
      onChange={handleChange}
      placeholder="Masukkan nama bahan..."
      className="mt-4 w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
    />
  )}
</div>

                            </div>

                            {productName && (
                                <input
                                    type="text"
                                    value={productName}
                                    readOnly
                                    className="mt-6 w-full rounded-xl border bg-stone-100 p-4 text-stone-600"
                                />
                            )}

                            <div className="mt-6">

                                <label className="mb-2 flex items-center gap-2 font-medium">
                                    <MessageSquare className="h-4 w-4" />
                                    Pesan
                                </label>

                                <textarea
                                    name="message"
                                    rows={6}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border p-4 focus:border-amber-500 focus:outline-none"
                                    placeholder="Tuliskan kebutuhan Anda..."
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-[#1EBE5D] disabled:opacity-60"
                            >
                                <Send className="h-5 w-5" />
                                {loading ? "Mengirim..." : "Kirim ke WhatsApp"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}