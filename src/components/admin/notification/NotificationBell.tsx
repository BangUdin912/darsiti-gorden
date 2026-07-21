"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Bell } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import { useRealtimeMessages } from "@/hook/useRealtimeMessages";
import { messageService } from "@/lib/messageService";

import type {
  NotificationMessage,
} from "@/types/message";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationMessage[]>([]);
  const [unreadCount, setUnreadCount] =
    useState(0);
  const [loading, setLoading] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const loadNotifications =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await messageService.getLatestNotifications();

        setNotifications(data);
        setUnreadCount(
          data.filter((item) => !item.read)
            .length
        );
      } catch (error) {
        console.error(
          "[NotificationBell]",
          error
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useRealtimeMessages({
    onChange: loadNotifications,
  });

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function markAllAsRead() {
    try {
      await messageService.markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
        }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  }

  async function markAsRead(id: string) {
    try {
      await messageService.markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );

      setUnreadCount((prev) =>
        Math.max(prev - 1, 0)
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          relative
          rounded-xl
          border
          border-stone-200
          bg-white
          p-2.5
          transition
          hover:bg-stone-100
          md:p-3
        "
      >
        <Bell
          size={20}
          className="text-stone-700"
        />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
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
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/30
              md:hidden
            "
            onClick={() =>
              setOpen(false)
            }
          />

          <NotificationDropdown
            notifications={notifications}
            unreadCount={unreadCount}
            loading={loading}
            markAllAsRead={
              markAllAsRead
            }
            markAsRead={markAsRead}
            onClose={() =>
              setOpen(false)
            }
          />
        </>
      )}
    </div>
  );
}