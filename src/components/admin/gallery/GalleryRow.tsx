"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";

import type { GalleryItem } from "@/types/gallery";

interface GalleryRowProps {
  no: number;
  item: GalleryItem;
  onEdit: () => void;
  onDelete: () => void;
}

function truncate(text?: string, max = 60) {
  if (!text) return "-";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export default function GalleryRow({
  no,
  item,
  onEdit,
  onDelete,
}: GalleryRowProps) {
  return (
    <tr className="border-t transition hover:bg-stone-50">
{/* No */}
<td className="p-3 text-center font-medium text-stone-600">
  {no}
</td>
      {/* FOTO */}
      <td className="p-3 text-center">
        <div className="flex items-center gap-3">

          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-100">
            <Image
              src={item.image_url || "/images/placeholder.jpg"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-semibold text-stone-800">
              {item.title}
            </p>


          </div>

        </div>
      </td>

      {/* KATEGORI */}
      <td className="p-3 text-center text-stone-600">
        {item.category || "-"}
      </td>

      {/* LOKASI */}
      <td className="p-3 text-center text-stone-600">
        {item.location || "-"}
      </td>

      {/* FEATURED */}
      <td className="p-3 text-center">
        {item.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
            <Star size={12} />
            Featured
          </span>
        ) : (
          <span className="text-xs text-stone-400">
            -
          </span>
        )}
      </td>

      {/* AKSI */}
      <td className="p-3">
        <div className="flex justify-center gap-2">

          <button
            onClick={onEdit}
            className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </td>

    </tr>
  );
}