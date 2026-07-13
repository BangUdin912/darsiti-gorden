"use client";

import Image from "next/image";
import Link from "next/link";
import type { Material } from "@/types/material";

interface Props {
  items: Material[];
}

export default function RecentMaterial({ items }: Props) {
  const recent = items ?? [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Material Terbaru
        </h2>

        <Link
          href="/admin/material"
          className="text-sm font-semibold text-amber-600 hover:underline"
        >
          Lihat Semua
        </Link>

      </div>

      {recent.length === 0 ? (

        <div className="flex h-56 items-center justify-center rounded-2xl border-2 border-dashed border-stone-200">

          <p className="text-stone-400">
            Belum ada material.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {recent.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border p-3"
            >

              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-stone-100">

                <Image
                  src={item.image || "/images/no-image.png"}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover"
                />

              </div>

              <div className="flex-1">

                <div className="mb-1 flex items-center gap-2">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  {item.featured && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Featured
                    </span>
                  )}

                </div>

                <p className="text-sm text-stone-500">
                  {item.category}
                </p>

              </div>

              <Link
                href={`/admin/material/edit/${item.id}`}
                className="rounded-xl border px-4 py-2 text-sm transition hover:bg-stone-50"
              >
                Edit
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}