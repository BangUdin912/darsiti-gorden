"use client";

import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Package,
  Layers3,
  Wrench,
  CalendarDays,
} from "lucide-react";

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
Layanan   : ${message.service || "-"}
Status    : ${message.status || "-"}

Kami akan segera menghubungi Anda untuk konsultasi lebih lanjut.

Terima kasih.`
  );

  const statusClass =
    message.status === "done"
      ? "bg-green-100 text-green-700"
      : message.status === "processing"
      ? "bg-blue-100 text-blue-700"
      : "bg-amber-100 text-amber-700";

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Detail Pesan
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Informasi lengkap konsultasi pelanggan
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-stone-300 px-5 py-2 transition hover:bg-stone-100"
          >
            Tutup
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid gap-6 md:grid-cols-2">

            <InfoItem
              label="Nama"
              value={message.name}
            />

            <InfoItem
              label="Email"
              value={message.email || "-"}
              icon={<Mail size={16} />}
            />

            <InfoItem
              label="Nomor WhatsApp"
              value={message.phone}
              icon={<Phone size={16} />}
            />

            <InfoItem
              label="Alamat"
              value={message.address || "-"}
              icon={<MapPin size={16} />}
            />

            <InfoItem
              label="Produk"
              value={message.productName || "-"}
              icon={<Package size={16} />}
            />

            <InfoItem
              label="Material"
              value={message.material || "-"}
              icon={<Layers3 size={16} />}
            />

            <InfoItem
              label="Jenis Layanan"
              value={message.service || "-"}
              icon={<Wrench size={16} />}
            />

            <div>
              <p className="mb-2 text-sm text-stone-500">
                Status
              </p>

              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusClass}`}
              >
                {message.status}
              </span>
            </div>

            <InfoItem
              label="Tanggal Dibuat"
              value={formatDate(message.createdAt)}
              icon={<CalendarDays size={16} />}
            />

            {message.updatedAt && (
              <InfoItem
                label="Terakhir Diubah"
                value={formatDate(message.updatedAt)}
                icon={<CalendarDays size={16} />}
              />
            )}

          </div>

          <hr className="my-8 border-stone-200" />

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <MessageSquare size={20} />
              Pesan Pelanggan
            </h3>

            <div className="rounded-2xl bg-stone-50 p-5 leading-7 whitespace-pre-wrap text-stone-700">
              {message.message || "-"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-stone-200 px-8 py-6">

          <a
            href={`https://wa.me/${message.phone}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageSquare size={18} />
            Balas WhatsApp
          </a>

          <button
            onClick={onClose}
            className="rounded-xl border border-stone-300 px-6 py-3 font-semibold transition hover:bg-stone-100"
          >
            Tutup
          </button>

        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

function InfoItem({
  label,
  value,
  icon,
}: InfoItemProps) {
  return (
    <div>
      <p className="mb-2 text-sm text-stone-500">
        {label}
      </p>

      <div className="flex min-h-[56px] items-start gap-3 rounded-2xl bg-stone-50 p-4">
        {icon && (
          <div className="mt-0.5 text-stone-500">
            {icon}
          </div>
        )}

        <span className="break-words font-medium text-stone-800">
          {value}
        </span>
      </div>
    </div>
  );
}