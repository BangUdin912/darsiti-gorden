import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";

interface Props {
  items: Product[];
}

export default function RecentProduct({ items }: Props) {
  const recent = items ?? [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Product Terbaru</h2>

        <Link
          href="/admin/product"
          className="text-sm font-semibold text-amber-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border-2 border-dashed border-stone-200">
          <p className="text-stone-400">Belum ada produk.</p>
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
                  src={item.image || "/images/gallery/gordenn1.jpg"}
                  alt={item.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="text-sm text-gray-500">
                  {item.category.length > 0
                    ? item.category.join(", ")
                    : "Uncategorized"}
                </p>

                <p className="font-semibold text-amber-600">
                  {formatPrice(item.price)}
                </p>
              </div>

              <Link
                href={`/admin/product/edit/${item.id}`}
                className="rounded-xl border px-4 py-2 text-sm"
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