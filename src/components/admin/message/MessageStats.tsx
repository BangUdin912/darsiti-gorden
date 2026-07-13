"use client";

import type { Message } from "@/types/message";

interface Props {
  items: Message[];
}

export default function MessageStats({
  items,
}: Props) {
  const total = items.length;

  const unread = items.filter(
    (x) => x.status === "new"
  ).length;

  const processing = items.filter(
    (x) => x.status === "processing"
  ).length;

  const done = items.filter(
    (x) => x.status === "done"
  ).length;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">

      <Card title="Total" value={total} />

      <Card title="Baru" value={unread} />

      <Card title="Diproses" value={processing} />

      <Card title="Selesai" value={done} />

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}