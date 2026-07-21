"use client";

import Link from "next/link";
import {
  Clock,
  MessageCircle,
} from "lucide-react";

import { messageService } from "@/lib/messageService";

import type {
  NotificationMessage,
} from "@/types/message";

interface NotificationDropdownProps {
  notifications: NotificationMessage[];
  unreadCount: number;
  loading?: boolean;
  markAllAsRead: () => Promise<void> | void;
  markAsRead: (id: string) => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  loading = false,
  markAllAsRead,
  markAsRead,
  onClose,
}: NotificationDropdownProps) {
  function formatTime(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  async function handleOpenNotification(
    id: string
  ) {
    try {
      // update database
      await messageService.markAsRead(id);

      // update state lokal
      markAsRead(id);
    } catch (error) {
      console.error(
        "[NotificationDropdown]",
        error
      );
    } finally {
      onClose();
    }
  }

  return (
    <div
      className="
        fixed
        inset-x-3
        top-16
        z-50
        overflow-hidden
        rounded-2xl
        border
        border-stone-200
        bg-white
        shadow-2xl

        md:absolute
        md:right-0
        md:left-auto
        md:top-14
        md:w-[400px]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-stone-200
          px-4
          py-4
        "
      >
        <div>
          <h3 className="font-semibold text-stone-900">
            Notifikasi
          </h3>

          <p className="text-xs text-stone-500">
            {unreadCount} pesan belum dibaca
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="
              text-xs
              font-medium
              text-amber-600
              transition
              hover:text-amber-700
            "
          >
            Tandai Dibaca
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-h-[60vh] overflow-y-auto md:max-h-[420px]">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div
              className="
                h-7
                w-7
                animate-spin
                rounded-full
                border-2
                border-stone-300
                border-t-amber-500
              "
            />
          </div>
        ) : notifications.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-3
              px-6
              py-12
              text-center
            "
          >
            <MessageCircle
              size={42}
              className="text-stone-300"
            />

            <div>
              <p className="font-semibold text-stone-700">
                Belum ada notifikasi
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Pesan pelanggan baru akan muncul di sini.
              </p>
            </div>
          </div>
        ) : (
          notifications.map((item) => (
            <Link
              key={item.id}
              href={`/admin/messages/${item.id}`}
              onClick={() =>
                handleOpenNotification(item.id)
              }
              className="
                block
                border-b
                border-stone-100
                p-4
                transition
                hover:bg-stone-50
              "
            >
              <div className="flex gap-3">
                {!item.read && (
                  <span
                    className="
                      mt-2
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-red-500
                    "
                  />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold text-stone-900">
                      {item.name}
                    </p>

                    <span className="text-[11px] text-stone-400">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-sm text-amber-600">
                    {item.productName ??
                      "Konsultasi"}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-xs
                      leading-5
                      text-stone-500
                    "
                  >
                    {item.message || "-"}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-xs text-stone-400">
                    <Clock size={13} />

                    <span>
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        className="
          border-t
          border-stone-200
          bg-stone-50
          px-4
          py-3
        "
      >
        <Link
          href="/admin/messages"
          onClick={onClose}
          className="
            block
            text-center
            text-sm
            font-semibold
            text-amber-600
            transition
            hover:text-amber-700
          "
        >
          Lihat Semua Pesan
        </Link>
      </div>
    </div>
  );
}