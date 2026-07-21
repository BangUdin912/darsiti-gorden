import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Layers3,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Wrench,
} from "lucide-react";

import { messageService } from "@/lib/messageService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MessageDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const message = await messageService.getById(id);

  if (!message) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow">
        <h1 className="text-2xl font-bold">
          Pesan tidak ditemukan
        </h1>

        <p className="mt-2 text-stone-500">
          Data yang Anda cari sudah tidak tersedia.
        </p>

        <Link
          href="/admin/messages"
          className="mt-6 inline-flex rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
        >
          Kembali ke Daftar Pesan
        </Link>
      </div>
    );
  }

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

  const statusLabel =
    message.status === "done"
      ? "Selesai"
      : message.status === "processing"
      ? "Diproses"
      : "Baru";

  const statusClass =
    message.status === "done"
      ? "bg-green-100 text-green-700"
      : message.status === "processing"
      ? "bg-blue-100 text-blue-700"
      : "bg-amber-100 text-amber-700";

  const whatsappText = encodeURIComponent(
`Halo ${message.name},

Terima kasih telah menghubungi Darsiti Gorden.

Data konsultasi Anda telah kami terima.

Nama      : ${message.name}
WhatsApp  : ${message.phone}
Alamat    : ${message.address || "-"}
Produk    : ${message.productName || "-"}
Material  : ${message.material || "-"}
Layanan   : ${message.service || "-"}
Status    : ${statusLabel}
Tanggal   : ${formatDate(message.createdAt)}

Kami akan segera menghubungi Anda untuk proses konsultasi lebih lanjut.

Terima kasih.
`
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/messages"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 transition hover:bg-stone-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-stone-900">
            Detail Pesan
          </h1>

          <p className="text-sm text-stone-500">
            Informasi lengkap konsultasi pelanggan.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-md">

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
              {statusLabel}
            </span>
          </div>

          <InfoItem
            label="Tanggal Dibuat"
            value={formatDate(message.createdAt)}
            icon={<CalendarDays size={16} />}
          />

          {message.updatedAt && (
            <InfoItem
              label="Terakhir Diperbarui"
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

        <div className="mt-8 flex flex-wrap gap-3">

          {message.phone && (
            <a
              href={`https://wa.me/${message.phone}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <MessageSquare size={18} />
              Balas via WhatsApp
            </a>
          )}

          <Link
            href="/admin/messages"
            className="inline-flex items-center rounded-xl border border-stone-300 px-6 py-3 font-semibold transition hover:bg-stone-50"
          >
            Kembali
          </Link>

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

      <div className="flex min-h-[60px] items-start gap-3 rounded-2xl bg-stone-50 p-4">

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