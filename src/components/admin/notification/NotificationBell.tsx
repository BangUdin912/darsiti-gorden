"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { useRealtimeMessages } from "@/components/hooks/useRealtimeMessages";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markAllAsRead,
  } = useRealtimeMessages();

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          rounded-xl
          border
          border-stone-200
          bg-white
          p-3
          transition
          hover:bg-stone-100
        "
      >
        <Bell
          size={20}
          className="text-stone-700"
        />

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          markAllAsRead={markAllAsRead}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}