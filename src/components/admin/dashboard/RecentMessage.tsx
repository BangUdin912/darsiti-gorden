import Link from "next/link";
import { Mail } from "lucide-react";
import type { Message } from "@/types/message";

interface Props {
  items: Message[];
}

export default function RecentMessage({ items }: Props) {
  const recent = items?.slice(0, 5) ?? [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Pesan Terbaru</h2>

        <Link
  href="/admin/messages"
  className="text-sm font-semibold text-amber-600 hover:underline"
>
  Lihat Semua
</Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border-2 border-dashed border-stone-200">
          <p className="text-stone-400">Belum ada pesan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recent.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <Mail size={18} className="text-amber-600" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="text-xs text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "-"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">{item.email}</p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}