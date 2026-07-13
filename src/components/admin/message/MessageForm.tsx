"use client";

import { FormEvent, useState } from "react";
import { messageService } from "@/lib/messageService";

interface MessageFormProps {
  productName?: string;
}

export default function MessageForm({
  productName,
}: MessageFormProps) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
const [material, setMaterial] = useState("");
  const [message, setMessage] = useState(
    productName
      ? `Halo, saya ingin berkonsultasi mengenai produk "${productName}".`
      : ""
  );

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama wajib diisi.");
      return;
    }

    if (!phone.trim()) {
      alert("Nomor WhatsApp wajib diisi.");
      return;
    }

    if (!message.trim()) {
      alert("Pesan wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      // Simpan ke Supabase
      await messageService.create({
        name,
        phone,
        email,
        productName,
        service: "Produk",
        material,
        message,
      });

      // Kirim ke WhatsApp
      const text = `Halo Darsiti Gorden,

Nama : ${name}
WhatsApp : ${phone}
Email : ${email || "-"}

Produk :
${productName ?? "-"}

Material :
${material || "-"}

Pesan :
${message}`;



      window.open(
        `https://wa.me/6281915118782?text=${encodeURIComponent(text)}`,
        "_blank"
      );

      alert("Pesan berhasil dikirim.");

      // Reset Form
      setName("");
      setPhone("");
      setEmail("");

      setMessage(
        productName
          ? `Halo, saya ingin berkonsultasi mengenai produk "${productName}".`
          : ""
      );
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim pesan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >
      <div>
        <h2 className="text-2xl font-bold text-stone-800">
          Konsultasi Produk
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Isi formulir berikut. Tim Darsiti Gorden akan segera menghubungi Anda.
        </p>
      </div>

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Nomor WhatsApp"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email (Opsional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none"
      />

      {productName && (
        <input
          type="text"
          value={productName}
          readOnly
          className="w-full rounded-xl border bg-stone-100 p-4 text-stone-600"
        />
      )}

      <select
  value={material}
  onChange={(e) => setMaterial(e.target.value)}
  className="w-full rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none"
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
</select>

      <textarea
        rows={6}
        placeholder="Tulis pesan Anda..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-amber-600 py-4 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}