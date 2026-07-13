"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

interface ProductRowProps {
  no: number;
  item: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductRow({
  no,
  item,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <tr className="border-t transition hover:bg-stone-50">
{/* No */}
<td className="p-3 text-center font-medium text-stone-600">
  {no}
</td>
      {/* Produk */}
      <td className="p-3 text-center">
        <div className="flex items-center gap-3">

          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-100">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div>
            <p className="font-semibold text-stone-800">
              {item.name}
            </p>


          </div>

        </div>
      </td>

      {/* Kategori */}
      <td className="p-4 text-center">
  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
    {item.category}
  </span>
</td>

      {/* Harga */}
<td className="p-3 text-center font-medium text-stone-800">
  {formatPrice(item.price)}
</td>

      {/* Featured */}
      <td className="p-3 text-center">
        {item.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
            <Star size={12} />
            Featured
          </span>
        ) : (
          <span className="text-xs text-stone-400">
            Tidak
          </span>
        )}
      </td>

      {/* Aksi */}
      <td className="p-4">
  <div className="flex justify-center gap-2">
    <button
      onClick={onEdit}
      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={onDelete}
      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
    >
      <Trash2 size={18} />
    </button>
  </div>
</td>

    </tr>
  );
}