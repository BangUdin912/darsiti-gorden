"use client";

import type { Message } from "@/types/message";

interface Props {
  message: Message;
  onDetail: (message: Message) => void;
}

export default function MessageRow({
  message,
  onDetail,
}: Props) {
  return (
    <tr className="border-b hover:bg-stone-50">

      <td className="px-5 py-4 font-medium">
        {message.name}
      </td>

      <td className="px-5 py-4">
        {message.phone}
      </td>

      <td className="px-5 py-4">
        {message.service || "-"}
      </td>

      <td className="px-5 py-4">
        {new Date(message.createdAt).toLocaleDateString("id-ID")}
      </td>

      <td className="px-5 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            message.status === "new"
              ? "bg-blue-100 text-blue-700"
              : message.status === "processing"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.status}
        </span>

      </td>

      <td className="px-5 py-4 text-center">

        <button
          onClick={() => onDetail(message)}
          className="rounded-lg border px-4 py-2 hover:bg-stone-100"
        >
          Detail
        </button>

      </td>

    </tr>
  );
}