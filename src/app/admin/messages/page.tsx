"use client";

import MessageFilter from "@/components/admin/message/MessageFilter";
import MessageTable from "@/components/admin/message/MessageTable";

import { useMessages } from "@/hook/useMessages";

export default function MessagesPage() {
  const {
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
  } = useMessages();

  console.log({
  service,
  setService,
  type: typeof setService,
});

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">
          Customer Messages
        </h1>

        <p className="text-sm text-stone-500">
          Rekap seluruh pesan pelanggan yang masuk dari website.
        </p>
      </div>

      <div className="mb-6">
        <MessageFilter
          search={search}
          onSearchChange={setSearch}
          service={service}
          onServiceChange={setService}
          date={date}
          onDateChange={setDate}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      <MessageTable
        messages={filteredMessages}
        loading={loading}
        refresh={refresh}
      />
    </div>
  );
}