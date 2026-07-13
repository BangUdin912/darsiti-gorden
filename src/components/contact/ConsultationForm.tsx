"use client";

import { useProducts } from "@/hook/useProducts";
import { useMaterials } from "@/hook/useMaterials";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  Lock,
  MessageCircle,
} from "lucide-react";

import { messageService } from "@/lib/messageService";

interface ConsultationFormProps {
  productName?: string;
  service?: string;
  material?: string;
  onSuccess?: () => void;
}

export default function ConsultationForm({
  productName = "",
  service = "",
  material = "",
  onSuccess,
}: ConsultationFormProps) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    productName,
    material,
    service,
    message: "",
  });
const {
  products,
  loading: loadingProducts,
} = useProducts();

const {
  materials,
  loading: loadingMaterials,
} = useMaterials();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      productName,
      material,
      service,
    }));
  }, [productName, material, service]);

function handleChange(
  e: ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  async function handleSubmit(
    e: FormEvent
  ) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.message.trim()
    ) {
      alert(
        "Nama, Nomor WhatsApp dan Pesan wajib diisi."
      );
      return;
    }

    if (
      form.email &&
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      alert("Format email tidak valid.");
      return;
    }

    try {
      setLoading(true);

      await messageService.create({
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        productName: form.productName,
        material: form.material,
        service: form.service,
        message: form.message,
      });

      const phone =
        "6281915118782";

      const text = `Halo Darsiti Gorden.

Nama : ${form.name}
No. WhatsApp : ${form.phone}
Email : ${form.email || "-"}
Alamat : ${form.address || "-"}

Produk : ${form.productName || "-"}
Material : ${form.material || "-"}
Layanan : ${form.service || "-"}

Pesan :
${form.message}`;

      onSuccess?.();

window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
);

onSuccess?.();
    } catch (err) {
      console.error(err);

      alert(
        "Terjadi kesalahan saat mengirim konsultasi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Nama */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Nama Lengkap *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none transition focus:border-amber-500"
          />
        </div>

        {/* WA */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            No. WhatsApp *
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none transition focus:border-amber-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Email (Opsional)
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none transition focus:border-amber-500"
          />
        </div>

        {/* Alamat */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Alamat (Opsional)
          </label>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat pemasangan"
            className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none transition focus:border-amber-500"
          />
        </div>

        {/* Produk */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Produk (Opsional)
          </label>

          <select
  name="productName"
  value={form.productName}
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      productName: e.target.value,
    }))
  }
  className="
    h-12
    w-full
    rounded-xl
    border
    border-stone-300
    bg-white
    px-4
    outline-none
    transition
    focus:border-amber-500
  "
>
  <option value="">
    Pilih Produk (Opsional)
  </option>

  {products.map((product) => (
    <option
      key={product.id}
      value={product.name}
    >
      {product.name}
    </option>
  ))}
</select>
        </div>

        {/* Material */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Material (Opsional)
          </label>

          <select
  name="material"
  value={form.material}
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      material: e.target.value,
    }))
  }
  className="
    h-12
    w-full
    rounded-xl
    border
    border-stone-300
    bg-white
    px-4
    outline-none
    transition
    focus:border-amber-500
  "
>
  <option value="">
    Pilih Material (Opsional)
  </option>

  {materials.map((material) => (
    <option
      key={material.id}
      value={material.name}
    >
      {material.name}
    </option>
  ))}
</select>
        </div>

      </div>

      {/* Layanan */}
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Layanan (Opsional)
        </label>

<select
  name="service"
  value={form.service}
  onChange={handleChange}
  className="h-12 w-full rounded-xl border border-stone-300 bg-white px-4 outline-none transition focus:border-amber-500"
>
  <option value="">Pilih Layanan (Opsional)</option>
  <option value="Konsultasi">Konsultasi</option>
  <option value="Survey Lokasi">Survey Lokasi</option>
  <option value="Pemasangan">Pemasangan</option>
  <option value="Perbaikan">Perbaikan</option>
</select>
      </div>

      {/* Pesan */}
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Pesan *
        </label>

        <textarea
          rows={4}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tuliskan kebutuhan Anda..."
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-500"
        />
      </div>

      {/* Tombol */}
      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:bg-[#20bc5a] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Mengirim...
          </>
        ) : (
          <>
            <MessageCircle size={18} />
            Lanjut ke WhatsApp
          </>
        )}
      </button>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
        <Lock size={14} />
        Data Anda aman dan hanya digunakan untuk keperluan konsultasi.
      </div>
    </form>
  );
}