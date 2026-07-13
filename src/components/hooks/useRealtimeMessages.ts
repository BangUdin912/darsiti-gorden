"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";


export interface NotificationMessage {
  id: string;
  name: string;
  productName?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}


export function useRealtimeMessages() {

  const [notifications, setNotifications] = useState<
    NotificationMessage[]
  >([]);

  const [unreadCount, setUnreadCount] = useState(0);



useEffect(() => {

  let channel: ReturnType<typeof supabase.channel>;


  async function initRealtime() {


    // Hapus channel lama jika masih ada
    const existingChannel =
      supabase
        .getChannels()
        .find(
          (item) =>
            item.topic ===
            "realtime:messages-realtime"
        );


    if (existingChannel) {
      await supabase.removeChannel(
        existingChannel
      );
    }



    channel = supabase
      .channel(
        "messages-realtime"
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {

          const newMessage =
            payload.new as any;


          const notification = {
            id: newMessage.id,
            name: newMessage.name,
            productName:
              newMessage.product_name,
            message:
              newMessage.message,
            createdAt:
              newMessage.created_at,
            read: false,
          };


          setNotifications((prev) => [
            notification,
            ...prev,
          ]);


          setUnreadCount(
            (prev) => prev + 1
          );

        }
      )
      .subscribe();

  }


  initRealtime();



  return () => {

    if (channel) {
      supabase.removeChannel(
        channel
      );
    }

  };


}, []);



  async function markAllAsRead() {


    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );


    setUnreadCount(0);


    // optional:
    // update database
    await supabase
      .from("messages")
      .update({
        read: true,
      })
      .eq("read", false);

  }



  return {
    notifications,
    unreadCount,
    markAllAsRead,
  };

}