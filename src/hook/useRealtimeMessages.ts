"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UseRealtimeMessagesProps {
  onChange?: () => void;
}

export function useRealtimeMessages({
  onChange,
}: UseRealtimeMessagesProps = {}) {
  useEffect(() => {
    // Gunakan nama channel yang unik agar tidak bentrok
    const channel = supabase
      .channel(`messages-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          onChange?.();
        }
      );

    channel.subscribe((status) => {
      console.log("[Realtime Messages]", status);
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onChange]);
}