"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";

import type { Material } from "@/types/material";

interface Props {
  no: number;
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MaterialRow({
  no,
  material,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-t hover:bg-stone-50">

  {/* No */}
  <td className="p-4 text-center font-medium text-stone-600">
    {no}
  </td>

  {/* Gambar */}
<td className="p-4">
  <div className="flex justify-center">
    <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-stone-100">
      <Image
        src={material.image || "/images/no-image.png"}
        alt={material.name}
        fill
        unoptimized
        className="object-cover"
      />
    </div>
  </div>
</td>

  {/* Nama */}
  <td className="p-4 text-center">
    <p className="font-semibold text-stone-800">
      {material.name}
    </p>
  </td>

  {/* Kategori */}
  <td className="p-4 text-center">
    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
      {material.category}
    </span>
  </td>

  {/* Warna */}
  <td className="p-4 text-center">
    {material.color || "-"}
  </td>

  {/* Featured */}
<td className="p-4 text-center">
  {material.featured ? (
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

  {/* Aksi */}
  <td className="p-4">
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