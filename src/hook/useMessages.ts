"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { messageService } from "@/lib/messageService";
import { useRealtimeMessages } from "./useRealtimeMessages";

import type { Message } from "@/types/message";

export function useMessages() {
  /**
   * Data State
   */
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Filter State
   */
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  /**
   * Load Messages
   */
  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data = await messageService.getAll();

      setMessages(data);
    } catch (error) {
      console.error("[useMessages]", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial Load
   */
  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * Realtime Listener
   */
  useRealtimeMessages({
    onChange: refresh,
  });

  /**
   * Filter Messages
   */
  const filteredMessages = useMemo(() => {
    return messages.filter((item) => {
      const keyword = search.trim().toLowerCase();

      const matchSearch =
        keyword === "" ||
        item.name.toLowerCase().includes(keyword) ||
        item.phone.toLowerCase().includes(keyword) ||
        (item.email ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.address ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.productName ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.material ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.service ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.message ?? "")
          .toLowerCase()
          .includes(keyword);

      const matchService =
        service === "" ||
        (item.service ?? "")
          .toLowerCase()
          .includes(service.toLowerCase());

      const matchDate =
        date === "" ||
        new Date(item.createdAt)
          .toISOString()
          .split("T")[0] === date;

      const matchStatus =
        status === "" ||
        item.status === status;

      return (
        matchSearch &&
        matchService &&
        matchDate &&
        matchStatus
      );
    });
  }, [
    messages,
    search,
    service,
    date,
    status,
  ]);

  return {
    messages,
    filteredMessages,

    loading,

    search,
    setSearch,

    service,
    setService,

    date,
    setDate,

    status,
    setStatus,

    refresh,
  };
}