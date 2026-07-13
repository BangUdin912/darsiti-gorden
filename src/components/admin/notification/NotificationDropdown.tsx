"use client";

import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";

import type { NotificationMessage } from "@/components/hooks/useRealtimeMessages";

interface NotificationDropdownProps {
  notifications: NotificationMessage[];
  unreadCount: number;
  markAllAsRead: () => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  markAllAsRead,
  onClose,
}: NotificationDropdownProps) {
  function formatTime(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  }

  return (
    <div
      className="
        absolute
        right-0
        top-16
        z-50
        w-96
        overflow-hidden
        rounded-2xl
        border
        border-stone-200
        bg-white
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h3 className="font-semibold text-stone-900">
            Notifikasi
          </h3>

          <p className="text-xs text-stone-500">
            {unreadCount} pesan baru
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="
              text-xs
              font-medium
              text-amber-600
              hover:text-amber-700
            "
          >
            Tandai Dibaca
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-2
              py-10
              text-center
            "
          >
            <MessageCircle
              size={40}
              className="text-stone-300"
            />

            <p className="font-medium text-stone-500">
              Belum ada notifikasi
            </p>
          </div>
        ) : (
          notifications.map((item) => (
            <Link
              key={item.id}
              href="/admin/messages"
              onClick={() => {
                markAllAsRead();
                onClose();
              }}
              className="
                block
                border-b
                p-4
                transition
                hover:bg-stone-50
              "
            >
              <div className="flex items-start gap-3">
                {!item.read && (
                  <div
                    className="
                      mt-1
                      h-3
                      w-3
                      rounded-full
                      bg-red-500
                    "
                  />
                )}

                <div className="flex-1">
                  <p className="font-semibold text-stone-900">
                    {item.name}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-1
                      text-sm
                      text-stone-600
                    "
                  >
                    {item.productName || "Konsultasi"}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-xs
                      text-stone-500
                    "
                  >
                    {item.message}
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-stone-400
                    "
                  >
                    <Clock size={13} />
                    {formatTime(item.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-stone-50 px-5 py-3">
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