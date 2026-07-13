"use client";

import type { Message } from "@/types/message";

interface Props {
  message: Message;
  onClose: () => void;
}

export default function MessageDetail({
  message,
  onClose,
}: Props) {
const whatsappText = encodeURIComponent(
`Halo ${message.name},

Terima kasih telah menghubungi Darsiti Gorden.

Data yang kami terima:

Nama      : ${message.name}
WhatsApp  : ${message.phone}
Alamat    : ${message.address || "-"}
Produk    : ${message.productName || "-"}
Material  : ${message.material || "-"}
Proyek    : ${message.service || "-"}

Kami akan segera menghubungi Anda untuk konsultasi lebih lanjut.

Terima kasih.`
);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">
          <h2 className="text-2xl font-bold">
            Detail Pesan
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[calc(90vh-170px)] overflow-y-auto space-y-5 px-8 py-6">

  <div>
    <p className="text-sm text-gray-500">
      Nama
    </p>

    <h3 className="font-semibold">
      {message.name}
    </h3>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      WhatsApp
    </p>

    <h3 className="font-semibold">
      {message.phone}
    </h3>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Email
    </p>

    <h3>
      {message.email || "-"}
    </h3>
  </div>

  {/* Alamat */}

  <div>
    <p className="text-sm text-gray-500">
      Alamat
    </p>

    <h3 className="whitespace-pre-wrap">
      {message.address || "-"}
    </h3>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Produk
    </p>

    <h3>
      {message.productName || "-"}
    </h3>
  </div>

  <div>
  <p className="text-sm text-gray-500">
    Material
  </p>

  <h3 className="font-medium">
    {message.material || "-"}
  </h3>
</div>

  <div>
    <p className="text-sm text-gray-500">
      Jenis Proyek
    </p>

    <h3>
      {message.service || "-"}
    </h3>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Pesan
    </p>

    <div className="rounded-2xl bg-stone-100 p-5 whitespace-pre-wrap">
      {message.message || "-"}
    </div>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Status
    </p>

    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm">
      {message.status}
    </span>
  </div>

</div>

        <div className="mt-8 flex gap-4">

          <a
            href={`https://wa.me/${message.phone}?text=${whatsappText}`}
            target="_blank"
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Balas WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
}